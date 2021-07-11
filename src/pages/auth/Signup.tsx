import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { auth } from '../../config/firebase';
import useStyles  from './style/style';

interface Props {

}

const Signup: React.FC<Props> = (props) => {

    const [registering, setRegistering] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const history = useHistory();
    const classes = useStyles();

    const validationSchema = yup.object({
        email: yup
            .string()
            .required('Email cannot be empty')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitSignup(values);
        },
    });

    const submitSignup = (values: any) => {
        if (error !== '') setError('');
        setRegistering(true);

        const { email, password } = values;

        auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            history.push('/login');
        })
        .catch(error => {
            console.log(error);

            if (error.code.includes('auth/weak-password')) {
                setError('Please enter a stronger password');
            } else if (error.code.includes('auth/email-already-in-use')){
                setError('Email already in use.')
            } else {
                setError('Unable to register. Try again later');
            }

            setRegistering(false);
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}/>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={registering}>Sign up</Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already registered? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontFamily: "Helvetica, Arial, sans-serif", marginTop: 15, fontSize: 18 }}>{error}</span>
                </form>
            </div>
        </Container>
    )
}

export default Signup;
