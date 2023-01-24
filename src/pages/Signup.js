
import { Field, Form, useFormik, FormikProvider } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Grid,
    TextField,
    Typography,
    Fab,
    Card,
    Button,
    Box
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            // hndle form submission
            console.log("submitted")
            axios.post("http://localhost:8082/user/signup",values, {
                headers: {
                'Content-Type': 'application/json'
                }
              })
            .then((result)=>{
                console.log(result)
                if(result.data){
                    navigate("/login")
                }
            })
            .catch((err)=>{
                console.log(err);
            })

        }
    });
    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        actions,
    } = formik;
    return (
        <div>
            <Card variant='outlined' style={{ width: '50rem',  marginLeft:'22rem' }} sx={{ p: 5, m: 5 }}>
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)',  }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Please Signup.
                            </Typography>
                            <TextField
                                fullWidth
                                sx={{mb:2}}
                                name="email"
                                variant="outlined"
                                label="Email Address"
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                fullWidth
                                name="password"
                                variant="outlined"
                                label="Password"
                                {...getFieldProps("password")}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </Box>
                        <Grid container spacing={9} style={{marginTop:"1rem"}}>
                        <Grid xs={1}></Grid>
                        <Grid xs={3}>
                        <Button type='submit' variant='contained'>Submit</Button>
                        </Grid>
                        <Grid xs={5}></Grid>
                        <Grid xs={3}>
                        <Button href="#text-buttons" onClick={()=>{navigate("/login")}}>Already Have an Account? Please Login</Button>
                        </Grid>
                        </Grid>

                    </Form>
                </FormikProvider>

            </Card>
        </div>
    );
}

export default Signup;