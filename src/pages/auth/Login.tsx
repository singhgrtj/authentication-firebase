import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { auth } from '../../config/firebase';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import useStyles from './style/style';

interface Props {

}

const Login: React.FC<Props> = (props) => {

    const [login, setLogin] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [user, setUser] = useState<boolean>(true);

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
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitLogin(values);
        },
    });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                history.push('/')
            }
        })
    }, [])

    const submitLogin = (values: any) => {
        if (error !== '') setError('');
        setLogin(true);
        
        const { email, password } = values;


        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            history.push('/');
        })
        .catch(error => {
            console.log(error);
            setLogin(false);
            setError('Enable to sign in. Please try again later.')
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}/>
                <Typography component="h1" variant="h5">Log in</Typography>
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
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={login}>Login</Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', fontFamily: "Helvetica, Arial, sans-serif", marginTop: 15, fontSize: 18 }}>{error}</span>
                </form>
            </div>
        </Container>
    )
}

export default Login;
