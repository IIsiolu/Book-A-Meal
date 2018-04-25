import chai  from 'chai'
import chaiHttp from 'chai-http'
import server  from '../server.js'

import db from '../src/data/db'

const expect = chai.expect;

chai.use(chaiHttp);
//import 'babel-polyfill


describe('Book-A-Meal', () => {

   describe('Should load the Homepage', () => {
      it('responds with status 200', (done) => {
        chai.request(server)
          .get('/')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
          });
      });
    });
    describe('Should get all Meals', () => {
        it('responds with status 200', (done) => {
          chai.request(server)
            .get('/api/v1/meals')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('array');
              expect(res).to.be.json;
              done();
            });
        });
      });

   describe('Should create a Meal', () => {
      it('responds with status 200', (done) => {
        chai.request(server)
          .post('/api/v1/meals')
          .set('Content-Type', 'application/json')
          .send({
            'name': 'Eba', 
            'id': 10,
            'price': '#1000',
            'description': 'very cool to eat',
            'image': 'http://faceboo.com/home.png'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
          });
      });
    });

    describe('Should update a Meal', () => {
      it('responds with status 200', (done) => {
        chai.request(server)
          .put('/api/v1/meals/1')
          .send({
            "id": "1",
            'name': 'turkey', 
            'price': '#1000',
            'description': 'very cool to eat',
            'image': 'http://faceboo.com/home.png'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            done();
          });
      });
    });

     describe('Should fail  to update a Meal not in the DB', () => {
      it('responds with status 404', (done) => {
        chai.request(server)
          .put('/api/v1/meals/1iiii')
          .send({
            "id": "1",
            'name': 'turkey', 
            'price': '#1000',
            'description': 'very cool to eat',
            'image': 'http://faceboo.com/home.png'
          })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            done();
          });
      });
    });



    describe('Should delete a MEAL', () => {
      it('responds with status 200', (done) => {
        chai.request(server)
          .delete('/api/v1/meals/2')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            done();
          });
      });
    });


    describe('Should fail for delete MEAL not in DB', () => {
      it('responds with status 404', (done) => {
        chai.request(server)
          .delete('/api/v1/meals/20')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            done();
          });
      });
    });





    describe('Should add a new Menu', () => {
      it('responds with status 200', (done) => {
        chai.request(server)
          .post('/api/v1/menu')
          .set('Content-Type', 'application/json')
          .send({
            "name": "Wheat",
            "description": "its very good for everything",
            "price": "#500",
            "image": "https://www.google.com.ng/imgres?imgurl=https%3A"
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res).to.be.json;
            done();
          });
      });
    });

    describe('Should get all Menu for a day', () => {
      it('responds with status 200', (done) => {
        chai.request(server)
          .get('/api/v1/menu')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res).to.be.json;
            done();
          });
      });
    });

    describe('Should edit an ORDER', () => {
         it('responds with status 200', (done) => {
           chai.request(server)
             .put('/api/v1/orders/1')
             .send({
              "customerName": "oluwa timothy",
              "name": "Sauce",
              "number": "3",
              "price": "#7000",
              "image": "https://www.google.com.ng/imgres?imgurl=https%3A"
             })
             .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.be.an('object');
               expect(res).to.be.json;
               done();
             });
         });
    });

    describe('Should fail to modify ORDER not in DB', () => {
      it('responds with status 404', (done) => {
        chai.request(server)
             .put('/api/v1/orders/11')
             .send({
              "customerName": "oluwa timothy",
              "name": "Sauce",
              "number": "3",
              "price": "#7000",
              "image": "https://www.google.com.ng/imgres?imgurl=https%3A"
             })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            done();
          });
      });
    });


//     describe('Should fail to edit a CENTER not in the DB', () => {
//          it('responds with status 404', (done) => {
//            chai.request(server)
//              .put('/api/centers/2221')
//              .send({
//                "name":  "Suru Center", 
//                "city":  "Lagos Main Land",
//                "address": "No 22, Akerele Street Lagos",
//                "facility": "['radio', 'open roof', '2, 000 chairs', ]"
//              })
//              .end((err, res) => {
//                expect(res).to.have.status(404);
//                expect(res).to.be.json;
//                expect(res.body).to.be.an('object');
//                done();
//              });
//          });
//     });

//      describe('Should catch any invalid routes ', () => {
//       it('responds with status 404', (done) => {
//         chai.request(server)
//           .get('/kkfkf/ff')
//           .set('Content-Type', 'application/json')
//           .end((err, res) => {
//             expect(res).to.have.status(404);
//             expect(res).to.be.json;
//             done();
//           });
//       });
//     });

 });