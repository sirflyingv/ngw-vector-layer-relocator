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
      sourceNgw: '',
      sourceLayerId: '',
      targetNgw: '',
      targetGroupId: ''
    },
    validationSchema: yup.object({
      sourceNgw: yup.string().required(),
      sourceLayerId: yup.string().required(),
      targetNgw: yup.string().required(),
      targetGroupId: yup.string().required()
    }),
    onSubmit: async (data) => {
      console.log(data);
      const kek = await axios.get('/test');
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
            <Form className="p-3" onSubmit={formik.handleSubmit}>
              <div className="d-flex">
                <Card>
                  <Card.Header as="h5">Featured</Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header as="h5">Featured</Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </div>

    // <div className="d-flex flex-column h-100">
    //   <div className="row justify-content-center align-content-center h-100">
    //     <div className="col-12 col-md-8 col-xxl-6">
    //       <Container className="h-100 my-4 overflow-hidden rounded shadow">
    //         <div className="d-flex gap-5 justify-content-around p-5">
    //           <h1>{'Resource relocator'}</h1>
    //           <div className="d-flex">
    //             <Form className="p-3" onSubmit={formik.handleSubmit}>
    //               <Card className="shadow-sm">
    //                 <Card.Body>
    //                   <Card.Title>
    //                     <h3>{'Source'}</h3>
    //                   </Card.Title>
    //                   <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <Form.Label>{'sourceNgw'}</Form.Label>
    //                     <Form.Control
    //                       autoFocus
    //                       name="sourceNgw"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.sourceNgw}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'demo.nextgis.com'}
    //                     />
    //                   </Form.Group>
    //                   <Form.Group
    //                     className="mb-3"
    //                     controlId="formBasicPassword"
    //                   >
    //                     <Form.Label>{'sourceLayerId'}</Form.Label>
    //                     <Form.Control
    //                       name="sourceLayerId"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.sourceLayerId}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'1337'}
    //                     />
    //                   </Form.Group>
    //                   <Form.Group
    //                     className="mb-3"
    //                     controlId="formBasicPassword"
    //                   >
    //                     <Form.Label>{'targetNgw'}</Form.Label>
    //                     <Form.Control
    //                       name="targetNgw"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.targetNgw}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'sandbox.nextgis.com'}
    //                     />
    //                   </Form.Group>
    //                   <Form.Group
    //                     className="mb-3"
    //                     controlId="formBasicPassword"
    //                   >
    //                     <Form.Label>{'targetGroupId'}</Form.Label>
    //                     <Form.Control
    //                       name="targetGroupId"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.targetGroupId}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'3333'}
    //                     />
    //                   </Form.Group>
    //                   {/* </Form> */}
    //                 </Card.Body>
    //               </Card>
    //               <Card className="shadow-sm">
    //                 <Card.Body>
    //                   <Card.Title>
    //                     <h3>{'Target'}</h3>
    //                   </Card.Title>
    //                   {/* <Form className="p-3" onSubmit={formik.handleSubmit}> */}
    //                   <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <Form.Label>{'sourceNgw'}</Form.Label>
    //                     <Form.Control
    //                       autoFocus
    //                       name="sourceNgw"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.sourceNgw}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'demo.nextgis.com'}
    //                     />
    //                   </Form.Group>
    //                   <Form.Group
    //                     className="mb-3"
    //                     controlId="formBasicPassword"
    //                   >
    //                     <Form.Label>{'sourceLayerId'}</Form.Label>
    //                     <Form.Control
    //                       name="sourceLayerId"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.sourceLayerId}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'1337'}
    //                     />
    //                   </Form.Group>
    //                   <Form.Group
    //                     className="mb-3"
    //                     controlId="formBasicPassword"
    //                   >
    //                     <Form.Label>{'targetNgw'}</Form.Label>
    //                     <Form.Control
    //                       name="targetNgw"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.targetNgw}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'sandbox.nextgis.com'}
    //                     />
    //                   </Form.Group>
    //                   <Form.Group
    //                     className="mb-3"
    //                     controlId="formBasicPassword"
    //                   >
    //                     <Form.Label>{'targetGroupId'}</Form.Label>
    //                     <Form.Control
    //                       name="targetGroupId"
    //                       onChange={formik.handleChange}
    //                       value={formik.values.targetGroupId}
    //                       onBlur={formik.handleBlur}
    //                       type="text"
    //                       required
    //                       placeholder={'3333'}
    //                     />
    //                   </Form.Group>
    //                 </Card.Body>
    //               </Card>
    //             </Form>
    //           </div>
    //         </div>
    //         <Button variant="primary" type="submit">
    //           {'GOGOGOGOG'}
    //         </Button>
    //       </Container>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
