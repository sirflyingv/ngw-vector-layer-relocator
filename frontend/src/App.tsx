import React, { useState } from 'react';
import {
  Button,
  Form,
  Card,
  Container,
  Accordion,
  Alert
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState<boolean>();
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>();
  const [messageKey, setMessageKey] = useState<string>();

  const messageMapping: { [key: string]: string } = {
    SOURCE_IS_NOT_VECTOR: 'sourceIsNotVector',
    TARGET_IS_NOT_GROUP: 'targetIsNotGroup',
    ALREADY_EXISTS: 'alreadyExists',
    SOURCE_RESOURCE_NOT_FOUND: 'sourceResourceNotFound',
    TARGET_RESOURCE_NOT_FOUND: 'targetResourceNotFound',
    other: 'other'
  };

  const formik = useFormik({
    initialValues: {
      sourceNgwURL: 'demo.nextgis.com',
      sourceLayerId: '5573',
      sourceLogin: '',
      sourcePassword: '',
      targetNGWURL: 'sandbox.nextgis.com',
      targetGroupId: '2962',
      targetLogin: '',
      targetPassword: ''
    },
    validationSchema: yup.object({
      sourceNgwURL: yup.string().required(), // todo process URL as URL
      sourceLayerId: yup.number().required(),
      sourceLogin: yup.string(),
      sourcePassword: yup.string(),
      targetNGWURL: yup.string().required(),
      targetGroupId: yup.number().required(),
      targetLogin: yup.string(),
      targetPassword: yup.string()
    }),
    onSubmit: async (data) => {
      setIsFinished(false);
      try {
        setIsPending(true);
        const res = await axios.post('/transfer', data);
        setIsPending(false);
        setIsFinished(true);

        if (res.data.status === 'success') {
          setIsFailed(false);
          setMessageKey('success');
        } else if (res.data.status === 'failed') {
          setIsFailed(true);
          const { message } = res.data;
          setMessageKey(messageMapping[message || 'other']);
        }
      } catch (error) {
        setIsFinished(true);
        setIsFailed(true);

        // some tricky workaround on TypeScript catch(error) nuances
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        if (message === 'Network Error') {
          setMessageKey('networkError');
        } else {
          setMessageKey('other');
        }
        setIsPending(false);
      }
    }
  });

  const previewLayer = async () => {
    const vectorLayer = await axios.post('/preview', formik.values);
    console.log(vectorLayer);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Container className="my-4 overflow-hidden rounded shadow">
            <div className="d-flex justify-content-center pt-3">
              <h1>{t('header')}</h1>
            </div>
            <Form className="p-3" onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-around gap-3">
                {/* source details */}
                <Card className="w-100">
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
                    <Accordion className="mb-3 p-1">
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
                        onClick={previewLayer}
                        type="button"
                        className="mb-2 w-100"
                        variant="secondary"
                      >
                        {t('sourceForm.preview')}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                {/* Target details  */}
                <Card className="w-100">
                  <Card.Header as="h5">{t('targetForm.header')}</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3 p-1" controlId="targetNGWURL">
                      <Form.Label>{t('targetForm.targetNGWURL')}</Form.Label>{' '}
                      <Form.Control
                        name="targetNGWURL"
                        onChange={formik.handleChange}
                        value={formik.values.targetNGWURL}
                        onBlur={formik.handleBlur}
                        type="text"
                        required
                        placeholder={'sandbox.nextgis.com'} // add to locales
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 p-1" controlId="targetGroupId">
                      <Form.Label>{t('targetForm.targetGroupId')}</Form.Label>
                      <Form.Control
                        name="targetGroupId"
                        onChange={formik.handleChange}
                        value={formik.values.targetGroupId}
                        onBlur={formik.handleBlur}
                        type="text"
                        required
                        placeholder={'2962'} // add to locales
                      />
                    </Form.Group>
                    <Accordion className="mb-3 p-1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          {t('targetForm.authHeader')}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Form.Group
                            className="mb-3 p-1"
                            controlId="targetLogin"
                          >
                            <Form.Label>{t('targetForm.username')}</Form.Label>{' '}
                            <Form.Control
                              name="targetLogin"
                              onChange={formik.handleChange}
                              value={formik.values.targetLogin}
                              onBlur={formik.handleBlur}
                              type="text"
                              placeholder="" // add to locales
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3 p-1"
                            controlId="targetPassword"
                          >
                            <Form.Label>{t('targetForm.password')}</Form.Label>
                            <Form.Control
                              name="targetPassword"
                              onChange={formik.handleChange}
                              value={formik.values.targetPassword}
                              onBlur={formik.handleBlur}
                              type="password"
                              placeholder="" // add to locales
                            />
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    {/* <div className="p-1">
                      <Button
                        // onClick={previewLayer}
                        type="button"
                        className="mb-2 w-100"
                        variant="secondary"
                        disabled={!isFinished && !isFailed}
                      >
                        {'ff'}
                      </Button>
                    </div> */}
                  </Card.Body>
                </Card>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  className="mt-3 w-100"
                  variant="primary"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? t('submitPending') : t('submit')}
                </Button>
              </div>
              {isFinished ? (
                <Alert
                  className="mt-3 mb-1 py-2"
                  variant={isFailed ? 'danger' : 'success'}
                >
                  {t(`finishMessage.${messageKey}`)}
                </Alert>
              ) : null}
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
