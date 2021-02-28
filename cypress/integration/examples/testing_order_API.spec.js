describe("order API testing", () => {
  it("order API testing", function () {
    //Create a awaiting Fulfillment Order
    cy.request({
      method: "Post",
      url: "https://api.bigcommerce.com/stores/mjuebx3f0s/v2/orders",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": "1phjqx8808ipjdid4xqte2y47yav07u",
      },
      body: {
        billing_address: {
          city: "Austin",
          country: "United States",
          country_iso2: "US",
          email: "janedoe@email.com",
          first_name: "Jane",
          last_name: "Doe",
          state: "Texas",
          street_1: "123 Main Street",
          zip: "78751",
        },
        products: [
          {
            name: "BigCommerce Coffee Mug",
            price_ex_tax: 45,
            price_inc_tax: 50,
            quantity: 1,
          },
        ],
      },
    })
      .then((response) => {
        expect(response.status).to.equal(201);
      })
      .as("response");

    //Get an order with created order id
    cy.then(() => {
      cy.request({
        method: "Get",
        url:
          "https://api.bigcommerce.com/stores/mjuebx3f0s/v2/orders/" +
          this.response.body.id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "1phjqx8808ipjdid4xqte2y47yav07u",
        },
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
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "1phjqx8808ipjdid4xqte2y47yav07u",
        },
        body: {
          status_id: 2,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
});
