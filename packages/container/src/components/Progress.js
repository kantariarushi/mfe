import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => {
    return createStyles({
        bar: {
            width: "100%",
            "& > * + *": {
                marginTop: 10
            }
        }
    });
});

export default () => {
    const classes = useStyles();

    return(
        <div className={classes.bar}>
            <LinearProgress />
        </div>
    )
}