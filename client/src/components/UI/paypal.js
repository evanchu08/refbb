import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {
        const onSuccess = (payment) => {
            /*{"paid":true,"cancelled":false,
            "payerID":"8TBDWMETLSY2J",
            "paymentID":"PAY-891047510P680740LLO4GMJQ",
            "paymentToken":"EC-4MR67139671026542",
            "returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-891047510P680740LLO4GMJQ&token=EC-4MR67139671026542&PayerID=8TBDWMETLSY2J",
            "address":{"recipient_name":"test buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
            "email":"evanchu08-buyer@gmail.com"}
            */
            this.props.onSuccess(payment)
        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data));
        }

        const onError = (err) => {
            console.log(JSON.stringify(err));
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;

        const client = {
            sandbox: 'AbTpGZbaoiTM-aLFqSHPy9wUV4zl5UOv-1DJqeB_drZNeJFxQwBwczf5mXQkghFYKHPw-e7nz82WSzRS',
            production: '',
        }
        return (
            <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={total}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                style={{
                    size: 'large',
                    color: 'blue',
                    shape: 'rect',
                    label: 'checkout'
                }}
            />
        )
    }
}

export default Paypal;
