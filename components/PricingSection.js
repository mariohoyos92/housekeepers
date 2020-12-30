import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useAuth } from "../util/auth";

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
    <section>
      <h1>Pricing</h1>
      <div className="justify-content-center">
        {items.map((item, index) => (
          <div className="py-3 d-flex align-items-stretch" key={index}>
            <div className="w-100">
              <div className="p-4 d-flex flex-column">
                <h5 className="mb-4 font-weight-bold">{item.name}</h5>
                <h1 className="mb-3 font-weight-bold">
                  ${item.price}
                  <small className="PricingSection__period">/mo</small>
                </h1>

                {item.description && <div className="mb-4">{item.description}</div>}

                {item.perks && (
                  <div as="span" className="mt-2 mb-3">
                    <ul className="list-unstyled">
                      {item.perks.map((perk, index) => (
                        <li className="py-1" key={index}>
                          <i className="mr-3 fas fa-check text-success" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    {item.description}
                  </div>
                )}

                <Link
                  href={auth.user ? `/purchase/${item.id}` : `/auth/signup?next=/purchase/${item.id}`}
                  passHref={true}
                >
                  <Button>Choose</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
