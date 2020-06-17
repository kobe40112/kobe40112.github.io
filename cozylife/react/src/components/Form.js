import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'


function Forms(props) {

    return (
      <>
      
        <Form className="Forme">
          <Form.Group controlId="exampleForm.SelectCustomSizeSm">
            <Form.Control as="select" size="sm">
              <option>{props.select}</option>
              <option >{props.txt}</option>
              <option>{props.txt2}</option>
            </Form.Control>
          </Form.Group>
        </Form>

      </>
    )
  }
  
  export default Forms