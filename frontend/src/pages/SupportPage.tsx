import { Accordion, Button } from "react-bootstrap"

const SupportPage = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "calc(100vh - 100px)",
                padding: "20px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div>
            <h1>FAQ</h1>
            <Accordion style={{width:"720px"}} className="justify-content-center">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>How can I track my order?</Accordion.Header>
                    <Accordion.Body>
                        We do not offer tracking services at this time.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>How long does the delivery take?</Accordion.Header>
                    <Accordion.Body>
                        Due to changing weather conditions, we cannot give any accurate approximations.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>How much is charged in shipping fees?</Accordion.Header>
                    <Accordion.Body>
                        Shipping fees remain purely theoretical at our webshop.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Can I modify my order after submitting it?</Accordion.Header>
                    <Accordion.Body>
                        No, once the order has been made, the order can no longer be altered.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>My product arrived damaged or defective!</Accordion.Header>
                    <Accordion.Body>
                        I'm very sorry to hear that! Every delivery comes with a return sheet you can  fill in. Simply paste the sheet on the package it came in, re-seal the box, and we'll send you a replacement once it arrives back here.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                    <Accordion.Header>I want a refund!</Accordion.Header>
                    <Accordion.Body>
                        All transactions are final - refunds are only available in Rerefunded credit TM
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                    <Accordion.Header>I have additional questions!</Accordion.Header>
                    <Accordion.Body>
                        You can always contact us by calling our number, 000-123-4567, a fully theoretical phone number.
                        We are also available for questioning during the presentation.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </div>
    )
}

export default SupportPage