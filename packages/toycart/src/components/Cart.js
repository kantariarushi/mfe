import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { emptyCart, changeAppNameAction } from 'marketing/Exports';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4),
        backgroundColor: 'red'
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
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: "20%"
    },
}));

const Cart = () => {
    const state = useSelector((state) => state);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [orderPlaced, setOrderPlaced] = useState(false)
    return (
        <div>
            {!orderPlaced && <div>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    {state.app1.appName?.map((card) => (
                        <div style={{ display: 'flex', marginTop: 100 }}>
                            <img src={card.image} alt='' style={{ height: 150, width: 150 }} />
                            <div style={{ marginLeft: 100 }}>
                                <h2>{card.name}</h2>
                                <p>{`$${card.price}`}</p>
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
                            </div>
                        </div>
                    ))}
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ width: "20%", marginTop: 100 }}
                    onClick={() => {
                        dispatch(emptyCart());
                        setOrderPlaced(true)
                    }
                    }
                >
                    Place Order
                </Button>
            </div>}
            {orderPlaced && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <span style={{ fontWeight: 700 }}>Order Placed successfully</span>
            </div>}
        </div>
    )
}

export default Cart;