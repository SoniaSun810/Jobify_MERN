import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import NotFoundError from "../errors/not-found.js";
import notFoundMiddleware from "../middleware/not-found.js";
import checkPermissions from "../utils/checkPermissions.js";
import JobContainer from "../client/src/components/JobContainer.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }
  // check permissions
  checkPermissions(req.user, job.createdBy);

  const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  // alternative approach
  // job.position = position;
  // job.company = company;
  // job.jobLocation = jobLocation;

  await job.save();
  res.status(StatusCodes.OK).json({ updateJob });
};

const deleteJob = async (req, res) => {
  const {id: jobId} = req.params
  const job = await Job.findOne({_id : jobId})
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }
  checkPermissions(req.user, job.createdBy)
  await job.remove()

  res.status(StatusCodes.OK).json({msg : 'Success! Job removed'})



};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
