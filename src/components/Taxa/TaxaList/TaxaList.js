import React, { Fragment } from 'react';
import axios from 'axios';
import classes from './Taxalist.module.scss'
import TaxalistItem from './TaxalistItem/TaxalistItem';
import {CSSTransition} from 'react-transition-group';

const Taxalist = (props) => {
  let list = []


  const handleReturn = () => {

  }

  props.taxas.forEach((item, index) => {
    if (item.nameType !== "PLACEHOLDER" && !/\d/.test(item.scientificName) ) {
      list.push(<TaxalistItem taxaHover={props.taxaHover} taxaClick={props.taxaClick} rank={item.rank} parentKey={item.parentKey ? item.parentKey : ''} taxaKey={item.key} scienceName={item.scientificName} name={item.canonicalName ? item.canonicalName : item.scientificName} index={index} key={`taxa-${index}`}></TaxalistItem>)
    }
    })

  return (
    <div className={classes.listWrapper}>
      <CSSTransition in={props.inprop} timeout={200} classNames={classes.test}>
        <ul className={classes.Taxalist}>
          <li onClick={() => {
            props.returnHandle(props.targetRank, props.taxas[0].parentKey)
          }}>..</li>

            {list}

          </ul>
      </CSSTransition>

    </div>

  )

}

export default Taxalist;
