import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import Newnft from '../components/Newnft';
import Drawer from '@mui/material/Drawer';

export default function Home() {
  const [collection, setCollection] = useState();
  const [collect, setCollect] = useState();
  const [addflag, SetAddFlag]=useState(false);
  const [modalFlag, setModalFlag]= useState(false)


  const DeleteCol = (id) =>{
    const formData = new FormData();
    formData.append("id",id)
    axios.post("http://localhost:8082/collection/delete",formData,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setCollection((collection)=> collection.filter((element)=> element._id != id))
      })
      .catch((err) => { console.log("error", err) })

    console.log(id)
  }
  const editCol=(id)=>{
    var c = collection.filter((element)=>element._id==id)
    c = c.map(element=>{
      console.log(element.rarity)
      const obj={
        key:element.rarity?.key,
        value:element.rarity?.value,
        ...element
      }
      return obj
    })
    setCollection(c);
    SetAddFlag(true);
    setModalFlag(true);
  }

  useEffect(() => {
    axios.get("http://localhost:8082/collection/all", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setCollection(res.data)
      })
      .catch((err) => { console.log("error", err) })
  }, [])

  return (
    <>
     
      <Grid className='m-3' container spacing={{ md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
     <div style={{marginLeft:"3rem", marginRight:"-10rem"}}>
       <Grid container spacing={3}>
            <Grid xs={2}></Grid>
            <Grid>
                    <Button onClick={()=>(setModalFlag(true))}>Add a New Nft</Button>
                    <Drawer
                        anchor={"bottom"}
                        open={modalFlag}
                        onClose={()=>(setModalFlag(false), SetAddFlag(false))}
                    >
                        <Newnft collect={collection} setOpenModal={setModalFlag} setCollect={setCollection} flag={addflag} setFlag={SetAddFlag} />
                    </Drawer>
            </Grid>
        </Grid>
       </div>

        { collection && collection?.map((element, index) => (
          <Grid item sm={6} md={6} key={index}>
            <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {element.coll}
              </Typography>
              <Typography variant="h5" component="div">
                Price: {element.price}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantity: {element.quantity}
              </Typography>
              <Typography variant="body2">
                <img src={`${element.image}`} style={{width:"5rem", height:"5rem"}} />
              </Typography>
              <Typography variant="body2">
                Rarity <br></br>
                key: {element?.rarity?.key ? element.rarity.key : element.rarity} | 
                value: {element?.rarity?.value ? element.rarity.value : element.rarity}
              </Typography>
            </CardContent>
            <CardActions>
            <Button variant="outlined" onClick={()=> (editCol(element._id))}>Edit</Button>
              <Button variant="outlined" onClick={()=> (DeleteCol(element._id))}>Delete</Button>
            </CardActions>
        </Card>
          </Grid>
        ))
        }
      </Grid>
    </>
  );
}