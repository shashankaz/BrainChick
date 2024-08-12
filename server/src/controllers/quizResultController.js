import Result from "../models/Result.js";
import { handleErrors } from "../utils/helpers.js";

export const saveQuizResult = async (req, res) => {
  try {
    const newResult = new Result(req.body);

    await newResult.save();
    res.status(201).json({ success: "true", resultId: newResult._id });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getAllQuizResults = async (req, res) => {
  try {
    const results = await Result.find();

    res.status(200).json({
      success: "true",
      results,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getQuizResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res
        .status(404)
        .json({ success: "true", message: "Result not found" });
    }

    res.status(200).json({
      success: "true",
      result,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getQuizResultByEmail = async (req, res) => {
  try {
    const result = await Result.find({ email: req.params.email });

    if (!result) {
      return res
        .status(404)
        .json({ success: "true", message: "Result not found" });
    }

    res.status(200).json({
      success: "true",
      result,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
