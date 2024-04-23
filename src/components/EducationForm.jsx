import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../App.css";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required").matches(/^\S.*\S$/, 'Name cannot contain empty spaces'),
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
  } = useForm({ resolver: yupResolver(schema), mode: "onChange", defaultValues: { educations: [] } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Box className="form-container">
        <h2 className="form-title">Education Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                {...register("name")}
                error={errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Age"
                {...register("age")}
                error={errors.age}
                helperText={errors.age?.message}
                inputMode="numeric"
              />
            </Grid>
            <Grid item xs={12}>
              {fields.map((education, index) => (
                <Box key={education.id} >
                  <TextField
                    required
                    fullWidth
                    label="School Name"
                    sx={{ marginBottom: 2 }}
                    {...register(`educations.${index}.schoolName`)}
                    error={errors.educations?.[index]?.schoolName}
                    helperText={errors.educations?.[index]?.schoolName?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Degree"
                    sx={{ marginBottom: 2 }}
                    {...register(`educations.${index}.degree`)}
                    error={errors.educations?.[index]?.degree}
                    helperText={errors.educations?.[index]?.degree?.message}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    sx={{ marginBottom: 2 }}
                    {...register(`educations.${index}.description`)}
                    error={errors.educations?.[index]?.description}
                    helperText={errors.educations?.[index]?.description?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    type="date"
                    label="Start Date"
                    sx={{ marginBottom: 2 }}
                    {...register(`educations.${index}.startDate`)}
                    InputLabelProps={{ shrink: true }}
                    error={errors.educations?.[index]?.startDate}
                    helperText={errors.educations?.[index]?.startDate?.message}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    sx={{ marginBottom: 2 }}
                    {...register(`educations.${index}.endDate`)}
                    InputLabelProps={{ shrink: true }}
                    error={errors.educations?.[index]?.endDate}
                    helperText={errors.educations?.[index]?.endDate?.message}
                  />
                  {index > 0 && (
                    <Button
                      fullWidth
                      type="button"
                      onClick={() => remove(index)}
                      variant="contained"
                      color="secondary"
                      sx={{ marginTop: 2, marginBottom: 2}}
                    >
                      Remove Education
                    </Button>
                  )}
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
              fullWidth
                type="button"
                onClick={() => append({})}
                variant="contained"
                color="primary"
              >
                Add Education
              </Button>
              {errors.educations && (
                <p className="error-message">
                  {errors.educations.message}
                </p>
              )}
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
            sx = {{marginTop: 2}}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EducationForm;
