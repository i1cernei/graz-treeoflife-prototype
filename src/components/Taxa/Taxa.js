import React, { Fragment, Component, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Taxa.module.scss'
import Taxalist from './TaxaList/TaxaList';
import InfoView from '../InfoView/InfoView';
import { debounce } from 'lodash';
import ReactPlayer from 'react-player';

const Taxa = (props) => {
  const [taxas, setTaxas] = useState([]);
  const [parentTaxas, setParentTaxas] = useState('KINGDOM');
  const [targetTaxas, setTargetTaxas] = useState('KINGDOM');
  const [imageLink, setImageLink] = useState({});
  const [info, setInfo] = useState([]);
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    fetchTaxa()

    axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=images&prop=extracts&exintro&exchars=2000&redirects=1&titles=tree_of_life_(biology)`, {
        }).then(resp => {
          console.log(resp.data)
          const pages = resp.data.query.pages
          const info = pages[Object.keys(pages)[0]].extract;
          setInfo(info);
        }).catch(error => { console.log(error); })
  }, [])

  const fetchTaxa = () => {
    setInProp(false);
    axios.get('http://localhost:4001/taxa/list').then(response => {
      setTaxas(response.data.taxa.results)
      setParentTaxas(response.data.taxa.parentRank);
      setTargetTaxas(response.data.taxa.targetRank);
      setInProp(true);
      console.log(response.data.taxa.results)
    }).catch(error => {
      console.log(`There was an error retrieving taxa list: ${error}`);
    })
  }

  const taxaClickHandle = (id, rank) => {
    console.log(`Clicked taxa: ${id}`);


    axios.post('http://localhost:4001/taxa/goDeep', { id, rank })
      .then(response =>
      {
        const filteredTaxa = []

        // response.data.taxa.results.forEach((item, index) => {
        //   if (item.rank == rank) {
        //     filteredTaxa.push(item)
        //   }
        // })e
        console.log(response.data.taxa);
        setTaxas(response.data.taxa);
        })
      .catch(error => console.log(`There was an error retrieving taxa list ${id}`))

  }

  const returnHandle = (parentRank, parentKey) => {
    axios.post('http://localhost:4001/taxa/goUp', { parentRank , parentKey})
      .then(response =>
      {
        const filteredTaxa = []

        // response.data.taxa.results.forEach((item, index) => {
        //   if (item.rank == rank) {s
        //     filteredTaxa.push(item)
        //   }
        // })e
        console.log(response.data.taxa);
        setTaxas(response.data.taxa);
        })
      .catch(error => console.log(`There was an error retrieving taxa list ${parentKey}`))

  }

  const taxaHoverHandle = debounce((name) => {
    //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=
    // axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${name}&limit=5`)
    axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${name}&limit=5`)
      .then(response => {
        const title = response.data[1][0];

        axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=images&prop=extracts&exintro&exchars=2000&redirects=1&titles=${title}`, {
        }).then(resp => {
          console.log(resp.data)
          const pages = resp.data.query.pages
          const info = pages[Object.keys(pages)[0]].extract;
          setInfo(info);
        }).catch(error => { console.log(error); })

        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages&titles=${title}&piprop=name%7Coriginal&pithumbsize=100`)
      .then(response => {
        const pages = response.data.query.pages;
        const imageLink = {
          source: pages[Object.keys(pages)[0]].original.source,
          // title: pages[Object.keys(pages)[0]].title
        } ;
        console.log(imageLink)
        setImageLink(imageLink);
      }).catch(error => {
        console.log(error);
    })


      }).catch(error => console.log(`There was an error retrieving taxa list ${id}`));


  }, 300, { leading: true, trailing: false})

  return (
    // <Fragment></Fragment>
    <Fragment>
      <main className={classes.Taxa}>
      <Taxalist taxaClick={taxaClickHandle} returnHandle={returnHandle} targetRank={targetTaxas} parentRank={parentTaxas} taxaHover={taxaHoverHandle} taxas={taxas}></Taxalist>
        <InfoView info={ info } image={imageLink}></InfoView>
      </main>
      <ReactPlayer className={classes.reactPlayer} playbackRate='0.6' playing={true} width='100%' height='100%' loop={true} url='/pexels-gamol.mp4'></ReactPlayer>
    </Fragment>
  )

}

export default Taxa;
