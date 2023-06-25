import React from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      sourceNgwURL: 'demo.nextgis.com',
      sourceLayerId: '5573'
      // targetNgw: '',
      // targetGroupId: ''
    },
    validationSchema: yup.object({
      sourceNgwURL: yup.string().required(),
      sourceLayerId: yup.string().required()
      // targetNgw: yup.string().required(),
      // targetGroupId: yup.string().required()
    }),
    onSubmit: async (data) => {
      console.log(data);
      const kek = await axios.post('/test', data);
      console.log(kek);
    }
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <div className="d-flex justify-content-center">
              <h1>{t('header')}</h1>
            </div>
            <div className="d-flex">
              <Card>
                <Card.Header as="h5">{t('sourceForm.header')}</Card.Header>
                <Card.Body>
                  <Form className="p-3" onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3 p-1" controlId="sourceNGWURL">
                      <Form.Label>{t('sourceForm.sourceNGWURL')}</Form.Label>{' '}
                      <Form.Control
                        autoFocus
                        name="sourceNgwURL"
                        onChange={formik.handleChange}
                        value={formik.values.sourceNgwURL}
                        onBlur={formik.handleBlur}
                        type="text"
                        required
                        placeholder={'demo.nextgis.com'} // add to locales
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 p-1" controlId="sourceLayerId">
                      <Form.Label>{t('sourceForm.sourceLayerId')}</Form.Label>
                      <Form.Control
                        name="sourceLayerId"
                        onChange={formik.handleChange}
                        value={formik.values.sourceLayerId}
                        onBlur={formik.handleBlur}
                        type="text"
                        required
                        placeholder={'1337'} // add to locales
                      />
                    </Form.Group>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                    <Button variant="primary" type="submit">
                      {t('submit')}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {/* <Card>
                <Card.Header as="h5">{t('targetForm.header')}</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card> */}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
