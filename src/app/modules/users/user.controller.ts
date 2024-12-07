import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const studentValidationData = studentZotValidationSchema.parse(studentData);
    const result = await UserService.createStudentIntoDB(password, studentData);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
