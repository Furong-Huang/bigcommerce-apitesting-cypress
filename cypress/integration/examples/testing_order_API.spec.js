describe("order API testing", () => {
  it("order API testing", function () {
    //Create a awaiting Fulfillment Order

    const headerContent = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": "1phjqx8808ipjdid4xqte2y47yav07u",
    };

    cy.fixture("billing_addressAndProduct").then((data) => {
      cy.request({
        method: "Post",
        url: "https://api.bigcommerce.com/stores/mjuebx3f0s/v2/orders",
        headers: headerContent,
        body: {
          billing_address: {
            city: data.city,
            country: data.country,
            country_iso2: data.country_iso2,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            state: data.state,
            street_1: data.street_1,
            zip: data.zip,
          },
          products: [
            {
              name: data.name,
              price_ex_tax: data.price_ex_tax,
              price_inc_tax: data.price_inc_tax,
              quantity: data.quantity,
            },
          ],
        },
      })
        .then((response) => {
          expect(response.status).to.equal(201);
        })
        .as("response");
    });

    //Get an order with created order id
    cy.then(() => {
      cy.request({
        method: "Get",
        url:
          "https://api.bigcommerce.com/stores/mjuebx3f0s/v2/orders/" +
          this.response.body.id,
        headers: headerContent,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    //Changing order status
    cy.then(() => {
      cy.request({
        method: "Put",
        url:
          "https://api.bigcommerce.com/stores/mjuebx3f0s/v2/orders/" +
          this.response.body.id,
        headers: headerContent,
        body: {
          status_id: 2,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
});
