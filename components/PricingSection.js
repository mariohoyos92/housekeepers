import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { useAuth } from "../util/auth";
import "../components/PricingSection.scss";

function PricingSection(props) {
  const auth = useAuth();

  const items = [
    {
      id: "monthly",
      name: "Monthly",
      price: "30",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
        "Faucibus porta lacus fringilla vel",
        "Aenean sit amet erat nunc",
      ],
    },
    {
      id: "yearly",
      name: "Yearly",
      price: "300",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
        "Faucibus porta lacus fringilla vel",
        "Aenean sit amet erat nunc",
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
      ],
    },
  ];

  return (
    <section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <h1>Pricing</h1>
        <Row className="justify-content-center">
          {items.map((item, index) => (
            <Col md={12} lg={4} className="py-3 d-flex align-items-stretch" key={index}>
              <Card className="w-100">
                <Card.Body className="p-4 d-flex flex-column">
                  <h5 className="mb-4 font-weight-bold">{item.name}</h5>
                  <h1 className="mb-3 font-weight-bold">
                    ${item.price}
                    <small className="PricingSection__period">/mo</small>
                  </h1>

                  {item.description && <Card.Text className="mb-4">{item.description}</Card.Text>}

                  {item.perks && (
                    <Card.Text as="span" className="mt-2 mb-3">
                      <ul className="list-unstyled">
                        {item.perks.map((perk, index) => (
                          <li className="py-1" key={index}>
                            <i className="mr-3 fas fa-check text-success" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                      {item.description}
                    </Card.Text>
                  )}

                  <Link
                    href={auth.user ? `/purchase/${item.id}` : `/auth/signup?next=/purchase/${item.id}`}
                    passHref={true}
                  >
                    <Button variant="primary" size="lg" block={true} className="mt-auto">
                      Choose
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PricingSection;
