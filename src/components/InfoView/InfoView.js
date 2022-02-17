import React, {Fragment} from 'react';
import classes from './InfoView.module.scss';

const InfoView = (props) => {
  let info;

  if (props.info.length > 71) {
    info = (
      <article dangerouslySetInnerHTML={{ __html: props.info }}></article>
    )
  } else {
    info = (<article ><p>Sadly, we were unable to find any relevant encyclopedia entries available at this time...</p></article>)
  }

  return (
    <Fragment>
    <section className={classes.InfoView}>
      {/* <img src={props.image.source} /*alt={props.image.title} */}

      {/* <article dangerouslySetInnerHTML={ { __html: props.info } }> */}
        {info}
        {/* </article> */}
      {props.image.source ? (<div className={classes.imageBG} style={{backgroundImage: `url(${props.image.source})`}}></div>): ''}

      </section>

      </Fragment>
  );

}

export default InfoView;