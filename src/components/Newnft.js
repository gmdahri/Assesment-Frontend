import { Gif } from "@mui/icons-material";
import { Button, Card, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Field, Form, useFormik, FormikProvider } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { useState } from "react";

export default function Newnft({ collect, setCollect, setOpenModal, flag, setFlag }) {
    const changePath = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        console.log("image", formData)
    }

    const validationSchema = Yup.object().shape({
        coll: Yup.string()
            .required('Collection is required'),
        price: Yup.string()
            .required('Price is required'),
        quantity: Yup.string()
            .required('Quantity is required'),
        key: Yup.string()
            .required('key is required'),
        value: Yup.string()
            .required('value is required'),
    });
    const formik = useFormik({
        initialValues:
        {
            coll: flag ? collect[0].coll : '',
            price: flag ? collect[0].price : '',
            quantity: flag ? collect[0].quantity : '',
            image: flag ? collect[0].image : '',
            key: flag ? collect[0].key : '',
            value: flag ? collect[0].value : ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            if (flag) {
                console.log("here for update", collect)
                await axios.put(`http://localhost:8082/collection/update/${collect[0]._id}`, values)
                    .then((res) => {
                        let co = collect.filter((element) => element._id != res.data._id);
                        co.push(res.data);
                        setCollect(co);
                        setFlag(false);
                        setOpenModal(false)
                    })
                    .catch((err) => { console.log("error", err) })
            }
            else {
                console.log("submitted", values);
                const formData = new FormData();
                formData.append("coll", values.coll)
                formData.append("price", values.price)
                formData.append("image", imagePath)
                formData.append("quantity", values.quantity)
                formData.append("key", values.key)
                formData.append("value", values.value)
                await axios.post("http://localhost:8082/collection/new", formData)
                    .then((res) => {
                        console.log("final", res.data.collection);
                        var c = {
                            key: res.data.collection.rarity.key,
                            value: res.data.collection.rarity.value,
                            ...res.data.collection
                        }
                        let new_collections = collect;
                        new_collections.push(c);
                        setCollect(new_collections);
                        setFlag(false);
                        setOpenModal(false);
                    })
                    .catch((err) => { console.log("error", err) })

            }
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


    const [imagePath, setImagePath] = useState('');

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('image', file);
        console.log("image", file)

        const response = await fetch('http://localhost:8082/collection/uploadImage', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        setImagePath(data.url);
        console.log("imagePath", data)
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <Card variant='outlined' style={{ width: '50rem', marginLeft: '20rem' }} sx={{ p: 5, m: 5 }}>
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Box sx={{ display: 'grid', }}>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label"
                                    sx={{ mb: 2 }}
                                >Collection</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={values.coll}
                                    onChange={(nextValue) => formik.setFieldValue('coll', nextValue)}
                                    label="Collection"
                                    {...getFieldProps("coll")}
                                    error={Boolean(touched.coll && errors.coll)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Privet</MenuItem>
                                    <MenuItem value={20}>Trivet</MenuItem>
                                    <MenuItem value={30}>Kriwet</MenuItem>
                                </Select>
                                <TextField
                                    fullWidth
                                    sx={{ mb: 2, mt: 2 }}
                                    name="price"
                                    variant="outlined"
                                    label="Price"
                                    {...getFieldProps("price")}
                                    error={Boolean(touched.price && errors.price)}
                                    helperText={touched.price && errors.price}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    name="quantity"
                                    variant="outlined"
                                    label="Quantity"
                                    {...getFieldProps("quantity")}
                                    error={Boolean(touched.quantity && errors.quantity)}
                                    helperText={touched.quantity && errors.quantity}
                                />
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <h6 style={{ marginTop: '-0.4rem', marginBottom: '0.3rem' }} >Media</h6>
                                    <Button variant="outlined" component="label" style={{ width: '100%', height: '2rem' }}>

                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <p> click to select files</p>
                                        }

                                        {/* <ErrorMessage name="image" /> */}
                                    </Button>
                                    {imagePath && <img src={imagePath} alt="Uploaded Image" style={{ width: "10rem", height: "4rem" }} />}


                                </div>
                                <Card variant='outlined' style={{ marginTop: '1rem' }} sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={3} style={{ marginTop: 1, marginLeft: '2rem' }}>
                                        <Grid xs={5}></Grid>
                                        <Grid xs={6}>
                                            <h4>RARITY</h4>
                                        </Grid>
                                        <Grid
                                            xs={5}
                                            style={{ marginBottom: '1rem', marginRight: '1rem' }}
                                        >
                                            <TextField
                                                fullWidth
                                                // sx={{ m: 2 }}
                                                name="key"
                                                variant="outlined"
                                                label="Key"
                                                {...getFieldProps("key")}
                                                error={Boolean(touched.key && errors.key)}
                                                helperText={touched.key && errors.key}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={5}
                                            style={{ marginBottom: '1rem', marginRight: '1rem' }}
                                        >
                                            <TextField
                                                fullWidth
                                                // sx={{ m: 2 }}
                                                name="value"
                                                variant="outlined"
                                                label="Value"
                                                {...getFieldProps("value")}
                                                error={Boolean(touched.value && errors.value)}
                                                helperText={touched.value && errors.value}
                                            />
                                        </Grid>
                                        <Grid xs={2}>
                                            <h4>Del</h4>
                                        </Grid>

                                    </Grid>
                                </Card>
                            </FormControl>
                            <Button variant="outlined" type="submit" style={{ marginTop: "1rem" }} >Add Rarity</Button>
                        </Box>

                    </Form>
                </FormikProvider>
            </Card>
        </>
    );
};