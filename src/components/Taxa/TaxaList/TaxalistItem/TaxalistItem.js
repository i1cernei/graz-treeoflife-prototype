import React, { Fragment } from 'react';
import axios from 'axios';
import classes from './TaxalistItem.module.scss'
import { permittedCrossDomainPolicies } from 'helmet';

const TaxalistItem = (props) => {


  return (
    <li datarank={props.rank} onMouseEnter={() => props.taxaHover(props.scienceName)} onClick={() => props.taxaClick(props.taxaKey, props.rank)}>{props.name}</li>
  )

}

export default TaxalistItem;
