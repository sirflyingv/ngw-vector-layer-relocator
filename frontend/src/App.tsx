import React from 'react';
import { Button, Form, Card, Container, Accordion } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      sourceNgwURL: 'demo.nextgis.com',
      sourceLayerId: '5573',
      sourceLogin: '',
      sourcePassword: ''
      // targetNgw: '',
      // targetGroupId: ''
    },
    validationSchema: yup.object({
      sourceNgwURL: yup.string().required(),
      sourceLayerId: yup.string().required()
      // sourceLogin: yup.string(),
      // sourcePassword: yup.string()
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
              <Form className="p-3" onSubmit={formik.handleSubmit}>
                <Card>
                  <Card.Header as="h5">{t('sourceForm.header')}</Card.Header>
                  <Card.Body>
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
                    <Accordion className="mb-3 p-1 w-100">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          {t('sourceForm.authHeader')}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Form.Group
                            className="mb-3 p-1"
                            controlId="sourceLogin"
                          >
                            <Form.Label>{t('sourceForm.username')}</Form.Label>{' '}
                            <Form.Control
                              name="sourceLogin"
                              onChange={formik.handleChange}
                              value={formik.values.sourceLogin}
                              onBlur={formik.handleBlur}
                              type="text"
                              placeholder="" // add to locales
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3 p-1"
                            controlId="sourcePassword"
                          >
                            <Form.Label>{t('sourceForm.password')}</Form.Label>
                            <Form.Control
                              name="sourcePassword"
                              onChange={formik.handleChange}
                              value={formik.values.sourcePassword}
                              onBlur={formik.handleBlur}
                              type="password"
                              placeholder="" // add to locales
                            />
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <div className="p-1">
                      <Button
                        className="mb-2 w-100"
                        variant="secondary"
                        type="submit"
                      >
                        {t('sourceForm.preview')}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                <Button variant="primary" type="submit">
                  {t('submit')}
                </Button>
              </Form>

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
