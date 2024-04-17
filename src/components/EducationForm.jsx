import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../App.css";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  age: yup.number().typeError("Age must be a number"),
  educations: yup
    .array()
    .of(
      yup.object().shape({
        schoolName: yup.string().required("School name is required"),
        degree: yup.string().required("Degree is required"),
        description: yup.string(),
        startDate: yup.date().required("Start date is required"),
        endDate: yup
          .date()
          .nullable()
          .when(
            "startDate",
            (startDate, schema) =>
              startDate &&
              schema.min(startDate, "End date must be after start date")
          ),
      })
    )
    .min(1, "At least one education entry is required"),
});

const EducationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Box className="form-container">
        <Typography variant="h4" gutterBottom className="form-title">
          Education Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Name <span className="required">*</span>
              </Typography>
              <TextField
                fullWidth
                {...register("name")}
                error={errors.name}
                helperText={errors.name?.message}
                className="form-field"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Email <span className="required">*</span>
              </Typography>
              <TextField
                fullWidth
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
                className="form-field"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Age
              </Typography>
              <TextField
                fullWidth
                type="number"
                {...register("age")}
                error={errors.age}
                helperText={errors.age?.message}
                className="form-field"
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="educations"
                control={control}
                defaultValue={[]}
                render={({ field: { value = [], onChange } }) => (
                  <div style={{ marginBottom: "20px" }}>
                    {value.map((education, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        <Typography variant="h6" gutterBottom>
                          School Name <span className="required">*</span>
                        </Typography>
                        <TextField
                          fullWidth
                          {...register(`educations.${index}.schoolName`)}
                          error={errors.educations?.[index]?.schoolName}
                          helperText={
                            errors.educations?.[index]?.schoolName?.message
                          }
                          className="form-field"
                        />
                        <Typography variant="h6" gutterBottom>
                          Degree <span className="required">*</span>
                        </Typography>
                        <TextField
                          fullWidth
                          {...register(`educations.${index}.degree`)}
                          error={errors.educations?.[index]?.degree}
                          helperText={
                            errors.educations?.[index]?.degree?.message
                          }
                          className="form-field"
                        />
                        <Typography variant="h6" gutterBottom>
                          Description
                        </Typography>
                        <TextField
                          fullWidth
                          {...register(`educations.${index}.description`)}
                          error={errors.educations?.[index]?.description}
                          helperText={
                            errors.educations?.[index]?.description?.message
                          }
                          className="form-field"
                        />
                        <Typography variant="h6" gutterBottom>
                          Start Date <span className="required">*</span>
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          {...register(`educations.${index}.startDate`)}
                          InputLabelProps={{ shrink: true }}
                          error={errors.educations?.[index]?.startDate}
                          helperText={
                            errors.educations?.[index]?.startDate?.message
                          }
                          className="form-field"
                        />
                        <Typography variant="h6" gutterBottom>
                          End Date
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          {...register(`educations.${index}.endDate`)}
                          InputLabelProps={{ shrink: true }}
                          error={errors.educations?.[index]?.endDate}
                          helperText={
                            errors.educations?.[index]?.endDate?.message
                          }
                          className="form-field"
                        />
                      </div>
                    ))}
                    <Grid container justifyContent="center">
                        <Button
                          type="button"
                          onClick={() => onChange([...value, {}])}
                          variant="contained"
                          color="primary"
                          className="submit-button"
                        >
                          Add Education
                        </Button>
                      </Grid>
                  </div>
                )}
              />
              {errors.educations && (
                <Typography color="error">
                  {errors.educations.message}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
                className="submit-button"
              >
                Submit
              </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EducationForm;
