import React, { useEffect, useRef, useState } from 'react';
import { Divider, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Button, ListItem } from '@material-ui/core';

import DataService from "../../services/DataService";
import styles from './styles';


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);


const Blank = (props) => {
    const { classes } = props;

    console.log("================================== Blank ======================================");


    // Component States
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [allFiles, setAllFiles] = useState([]);

    // Setup Component
    useEffect(() => {

    }, []);

    // Handlers
    const handleFileOnChange = (event) => {
        console.log(event.target.files)
        setFile(event.target.files[0]);
        setProgress(0);
        setMessage("");
    }
    const onUploadProgress = (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
    }
    const handleFileUpload = () => {
        var formData = new FormData();
        formData.append("file", file);
        DataService.UploadFile(formData, onUploadProgress)
            .then(function (response) {
                console.log(response.data);
                setMessage("Uploaded file size: " + response.data.size);

                // Read the files from state list
                var files = [...allFiles];
                files.push({
                    "name": file.name,
                    "size": response.data.size
                });

                // Set the state
                setAllFiles(files);

                // Reset the file
                setFile(null);
                //setProgress(0);
                //setMessage("");
            })
    }


    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth={false} className={classes.container}>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h5" gutterBottom>Upload File</Typography>
                            <Divider />
                            <br />
                            <label htmlFor="btn-upload">
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    onChange={(event) => handleFileOnChange(event)} />
                                <Button
                                    className={classes.btnChoose}
                                    variant="outlined"
                                    component="span" >
                                    Choose File
                                </Button>
                            </label>
                            <div className={classes.fileName}>
                                {file ? file.name : null}
                            </div>
                            <Button
                                className={classes.btnUpload}
                                color="primary"
                                variant="contained"
                                component="span"
                                disabled={!file}
                                onClick={() => handleFileUpload()}>
                                Upload
                            </Button>
                            {file && (
                                <Box className={classes.my20} display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <BorderLinearProgress variant="determinate" value={progress} />
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                                    </Box>
                                </Box>)
                            }
                            <br />
                            {message && (
                                <Typography variant="subtitle2">
                                    {message}
                                </Typography>
                            )}
                            <br /><br />
                            <Typography variant="h6" className={classes.listHeader}>
                                List of Files
                            </Typography>
                            <ul className={classes.listGroup}>
                                {allFiles &&
                                    allFiles.map((item, index) => (
                                        <ListItem
                                            divider
                                            key={index}>
                                            {item.name}, ({item.size})
                                        </ListItem>
                                    ))}
                            </ul>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5" gutterBottom>Upload File using Streams</Typography>
                            <Divider />
                            <br />

                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Blank);