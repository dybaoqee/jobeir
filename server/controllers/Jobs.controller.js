import Jobs from '../models/Jobs';
import Company from '../models/Company';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export const getJobs = async (req, res) => {
  // currently just filtering GET jobs just by date added...
  const postings = await Jobs.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .select('-description')
    .exec();

  if (!postings) throw Error('UNABLE_TO_FIND_JOBS');

  res.stats(200).send({ data: { postings }, errors: [] });
};

/**
 * Get a single job
 * @param req
 * @param res
 * @returns void
 */
export const getJob = async (req, res) => {
  const posting = await Jobs.findOne({ _id: req.params.jobId })
    .select('-description')
    .exec();

  if (!posting) throw Error('UNABLE_TO_FIND_JOB');

  res.status(200).send({ data: { posting }, errors: [] });
};

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export function createJob(req, res) {
  if (!req.body.title) {
    res.status(400).end();
  }

  const newJob = new Jobs(req.body);

  newJob.description.blocks = newJob.description.blocks;
  newJob.receivingEmails = newJob.receivingEmails;

  // Let's sanitize inputs
  newJob.company = sanitizeHtml(req.params.companyId);
  newJob.role = newJob.role;
  newJob.title = sanitizeHtml(newJob.title);
  newJob.employmentType = sanitizeHtml(newJob.employmentType);
  newJob.address = newJob.address;
  newJob.remote = sanitizeHtml(newJob.remote);
  newJob.salary.min = sanitizeHtml(newJob.salary.min);
  newJob.salary.max = sanitizeHtml(newJob.salary.max);
  newJob.equity.min = sanitizeHtml(newJob.equity.min || 0);
  newJob.equity.max = sanitizeHtml(newJob.equity.max || 0);
  newJob.equity.offer = sanitizeHtml(newJob.equity.offer);
  newJob.slug = slug(newJob.title.toLowerCase(), { lowercase: true });
  newJob.cuid = cuid();

  // Add the company to the current user
  Company.findOne({ _id: newJob.company }, (err, company) => {
    if (err) throw err;

    company.jobs.push(newJob._id);

    company.save(err => {
      if (err) {
        res.status(500).send({
          data: {},
          errors: [
            {
              error: 'INTERNAL_SERVER_ERROR',
              message: `There was an error creating the job ${newJob.title}`
            }
          ]
        });
      }
    });
  });

  newJob.save((err, saved) => {
    if (err) {
      res.status(409).send({
        data: {},
        errors: [
          {
            error: 'UNABLE_TO_CREATE_JOB',
            message: `Unable to create the job ${req.body.title}`
          }
        ]
      });
    } else {
      res.status(200).send({
        data: { job: saved },
        errors: []
      });
    }
  });
}

/**
 * Update a single Job
 * @param req
 * @param res
 * @returns void
 */
export function updateJob(req, res) {
  const values = req.body;

  Jobs.findOneAndUpdate(
    { _id: req.params.jobId },
    { ...values },
    { new: true }
  ).exec((err, posting) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send({
      data: { posting },
      errors: []
    });
  });
}

/**
 * Delete a job
 * @param req
 * @param res
 * @returns void
 */
export function deleteJob(req, res) {
  Jobs.findOne({ _id: req.params.jobId }).exec((err, job) => {
    if (err) {
      res.status(500).send(err);
    }

    job.remove(() => {
      res.status(200).send({
        data: {},
        errors: []
      });
    });
  });
}
