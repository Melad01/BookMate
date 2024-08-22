import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a vaild email please")
    .required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export const editSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a vaild email please")
    .required("Email is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 chars")
    .optional()
    .matches(passwordRules, "Create a stronger password"),
  password: yup.string().required("Password is required"),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a vaild email")
    .required("Email is required"),
});

export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{5}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required("Password is required")
    .matches(passwordRules, "Create a stronger password"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const logoutSchema = yup.object().shape({
  password: yup.string().min(6).required("Password is required"),
});

export const bookSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        CategoryID: yup.number().required("Category id is required"),
        CategoryName: yup.string().required("Category name is required"),
      })
    )
    .min(1, "At least one category is required")
    .required(),
  image_url: yup.string().optional(),
  description: yup.string().required("Description is required"),
  numberOfPages: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .min(1, "Number of pages must be greater than zero")
    .required("Number of pages is required"),
  releaseDate: yup.date().required("Release date is required"),
  pdf: yup.string().optional(),
  voice: yup.string().optional(),
});

/* const {} = useFormik({
  initialValues: {
    title: book ? book.title : "",
    author: book ? book.author : "",
    categories: book ? book.categories : [],
  },
}); */
