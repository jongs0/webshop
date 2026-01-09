import { useState } from "react";
import type { CartProductDTO, PaymentMethod, ProductDTO } from "../../types/models";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { API_URL } from "../../App";

type Props = {
    paymentMethods: PaymentMethod[];
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: PaymentMethod) => void;
};

const PaymentMethodDropdownComponent = ({ paymentMethods, paymentMethod, setPaymentMethod }: Props) => {

    const handleChange = (event: any) => {
        let fieldValue = event.target.value;
        setPaymentMethod(fieldValue);
        console.log(fieldValue)
    }

    return (
        <>
            <Form.Select aria-label="Select payment method" value={paymentMethod} onChange={handleChange}>
                <option key="" value={""}>Select payment method</option>
                {paymentMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                ))}
            </Form.Select>
        </>
    );
};

export default PaymentMethodDropdownComponent;
