import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MaterialLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Data from "./productData.json";
import { changeAppNameAction } from "../exports";
import { useDispatch, useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink component={Link} to="/" color="inherit">
        Your Website
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    a: {
      textDecoration: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "50.25%", // 16:9
    backgroundSize: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const checkIfProductInCartOrNot = (id) => {
    const isFound = state?.app1?.appName?.some((element) => {
      if (element.id === id) {
        return true;
      }

      return false;
    });
    return isFound;
  };
  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Toy Store
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              The toy store is more than just a place to buy toys. It's a place
              where dreams come to life, where imaginations run wild, and where
              memories are made. It's a magical place where kids can be kids,
              and adults can relive the joys of childhood.
            </Typography>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/pricing">
                    <Button variant="contained" color="primary">
                      Pricing
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/pricing">
                    <Button variant="outlined" color="primary">
                      Pricing
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Data.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name.length > 40
                        ? card.name.substring(0, 40 - 3) + "..."
                        : card.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {`Rs. ${card.price}`}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ alignSelf: "flex-end" }}>
                    {!checkIfProductInCartOrNot(card.id) ||
                      state?.app1?.appName?.find(
                        (item) => item.id === card.id && item
                      ).count === 0 ? (
                      <Button
                        onClick={() =>
                          dispatch(changeAppNameAction(card, "plus"))
                        }
                        size="small"
                        color="primary"
                      >
                        Add to cart
                      </Button>
                    ) : (
                      <div>
                        <span
                          onClick={() =>
                            dispatch(changeAppNameAction(card, "minus"))
                          }
                          style={{ cursor: "pointer" }}
                        >
                          minus
                        </span>
                        <span style={{ marginLeft: 20 }}>
                          {
                            state?.app1?.appName?.find(
                              (item) => item.id === card.id && item
                            ).count
                          }
                        </span>
                        <span
                          style={{ marginLeft: 20, cursor: "pointer" }}
                          onClick={() =>
                            dispatch(changeAppNameAction(card, "plus"))
                          }
                        >
                          plush
                        </span>
                      </div>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
