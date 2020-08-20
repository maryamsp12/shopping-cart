import * as React from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import formatCurrency from './../../util';

const ProductDialog = props => {
    const { open, close, product, addToCart } = props;

    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
        >
            <DialogContent>
                <div className="product-details">
                    <img src={product.images} alt={product.title} />
                    <div className="product-details-description">
                        <p>
                            <strong>{product.title}</strong>
                        </p>
                        <p>
                            {product.description}
                        </p>
                        <p>
                            Available sizes{" "}
                            {product.availableSizes.map(x => (
                                <span>
                                    {" "}
                                    <button
                                        className="button"
                                    >{x}</button>
                                </span>
                            ))}
                        </p>
                        <p className="product-price">
                            <div>{formatCurrency(product.price)}</div>
                            <button
                                className="button primary"
                                onClick={() => addToCart(product)}
                            >Add to cart</button>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;
