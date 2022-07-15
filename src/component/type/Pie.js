import React,{useEffect} from 'react';
import {GenerateColorDark,GenerateColorLight} from './../utils/colorChange'

export default function Pie(props) {
  const {color,mainColor,alpha,animation,animationDelay,values,onClickSlice,
    onHoverSlice,theme,label,labelAlign,propsLabel,propsLabelSlice,propsMain,group} = props;
  let ids = [];
  const idContainer = `container-pie-chart-${Math.random()*100000}`
  const constructElem = (lbl3,data,persen) =>
    `<table>
      <tr>
        <td colspan='3' style='text-align:center;'>${lbl3}</td>
      </tr>
      ${(group)?
        `<tr>
          <td style='text-align:left;'><b>Group </b></td>
          <td><b> : </b></td>
          <td style='text-align:center;'>${group}</td>
        </tr>`:''}
      <tr>
        <td style='text-align:left;'><b>Data </b></td>
        <td><b> : </b></td>
        <td style='text-align:center;'>${data} </td>
      </tr>
      <tr>
        <td style='text-align:left;'><b>Percentage </b></td>
        <td><b> : </b></td>
        <td style='text-align:center;'>${persen}%</td>
      </tr>
    </table>`

  const mouseDown = (e) => {
    const elem = e.currentTarget;
    if (!alpha) {
      if (elem.style.strokeOpacity === .7) {
        elem.style.strokeOpacity = 1;
      } else {
        elem.style.strokeOpacity = .7;
      }
    } else {
      if (elem.style.strokeOpacity === 1) {
        elem.style.strokeOpacity = alpha;
      } else {
        elem.style.strokeOpacity = 1;
      }
    }
    if (onClickSlice) {
      onClickSlice({label:elem.getAttribute('data-label'),data:elem.getAttribute('data-numeric'),persen:elem.getAttribute('data-persen'),
        group:group});
    } else {
      const lbl = document.getElementById(`label-${idContainer}`)
      lbl.style.display = 'block'
      const loc = document.getElementById(`container-main-${idContainer}`).getBoundingClientRect();
      lbl.style.top = `${e.clientY - loc.top}px`
      lbl.style.left = `${e.clientX - loc.left}px`
      lbl.innerHTML = `${constructElem(elem.getAttribute('data-label'),elem.getAttribute('data-numeric'),elem.getAttribute('data-persen'))}`
      lbl.style.color = elem.getAttribute('data-color')
      lbl.style.backgroundColor = elem.getAttribute('data-backgroundColor')
      lbl.style.border = elem.getAttribute('data-border')
    }
  }

  const onHover = (e) => {
    const elem = e.currentTarget;
    if (!alpha) {
      elem.style.strokeOpacity = .7;
    } else {
      elem.style.strokeOpacity = 1;
    }
    if (onHoverSlice) {
      onHoverSlice({label:elem.getAttribute('data-label'),data:elem.getAttribute('data-numeric'),persen:elem.getAttribute('data-persen'),
        group:group})
    } else {
      const lbl = document.getElementById(`label-${idContainer}`)
      if (lbl.style.display === 'none') {
        lbl.style.display = 'block';
        lbl.innerHTML = `${constructElem(elem.getAttribute('data-label'),elem.getAttribute('data-numeric'),elem.getAttribute('data-persen'))}`
        lbl.style.color = elem.getAttribute('data-color')
        lbl.style.backgroundColor = elem.getAttribute('data-backgroundColor')
        lbl.style.border = elem.getAttribute('data-border')
      }
      const loc = document.getElementById(`container-main-${idContainer}`).getBoundingClientRect();
      lbl.style.top = `${e.clientY - loc.top}px`
      lbl.style.left = `${e.clientX - loc.left}px`
    }
  }

  const mouseLeave = (e) => {
    const elem = e.currentTarget;
    if (!alpha) {
      elem.style.strokeOpacity = 1;
    } else {
      elem.style.strokeOpacity = alpha;
    }
    const lbl = document.getElementById(`label-${idContainer}`)
    lbl.style.display = 'none';
  }

  var totalData = 0;
  values.map((item)=>{
    totalData += item.data
  })

  var init = 0
  var angle = 0.0;
  var arrAnim = [];
  useEffect(()=>{
    if (init === 1) {
      angle = 0.0;
      arrAnim = [];
    } else {
      if (label) {
        if (animation) {
          setTimeout(function () {
            const main = document.getElementById(`main-label-${idContainer}`)
            main.style.opacity = 1
            main.style.top = `${0}px`
          }, animationDelay);
        }
      }
    }

    setTimeout(function () {
      for (var i = 0; i < arrAnim.length; i++) {
        const elem = document.getElementById(ids[i]);
        elem.style.strokeDashoffset = arrAnim[i].offset;
        elem.style.strokeDasharray = arrAnim[i].array;
      }
    }, animationDelay);
    init = 1;
  },[values])

  const labelMain = () => (
    (label)? (
        <div id={`main-label-${idContainer}`} style={(propsLabel)?propsLabel:{
          width: '100%', position: 'relative', textAlign: 'center',color: (color)?color:(theme === 'dark')?'black':'white',marginTop: (labelAlign === 'top')?0:'3rem',
          marginBottom: (labelAlign === 'bottom')?0:'3rem',fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Georgia', transition: (animation)? 'opacity,top 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
          opacity: (animation)?0:1,top: (animation)?'-5rem':0
        }}>{label}<br/><span style={{fontSize: '1.5rem'}}>Total Data : {totalData}</span></div>
    ):null
  )

  return(
    <div id={`container-main-${idContainer}`} style={{position:'relative',pointerEvents:'none'}}>
      {
        (labelAlign === 'top')?labelMain():null
      }
      <svg id={idContainer} viewBox='0 0 128 128' style={{
        position:'relative', width: `100%`, height: `inherit`, ...propsMain, borderRadius: '50%',
        backgroundColor: 'transparent', pointerEvents:'none'
      }}>
        {
          (group)?(
            <circle fill="white" r="50%" cx="50%" cy="50%" style={{pointerEvents:'none'}}/>
          ):null
        }
        {
          values.map((val,i) => {
            var id = `pie-chart-${Math.random()*100000}`;
            ids.push(id);
            var col;
            var mainCol;
            if (theme === 'dark') {
              mainCol = GenerateColorDark();
              col = 'white';
            } else {
              mainCol = GenerateColorLight();
              col = 'black';
            }
            if (animation) {
              arrAnim.push({offset:`-${201-(angle+val.data/totalData*201)}`,array:val.data/totalData*201+' 201'})
            }
            angle += val.data/totalData*201
            return(
              <>
                <circle key={i} id={id} fill="none" r="25%" cx="50%" cy="50%" strokeWidth='50%'
                  stroke={(mainColor)?mainColor[i]:`rgba(${mainCol[0]},${mainCol[1]},${mainCol[2]},${(alpha)?alpha:1})`}
                  strokeDasharray={(animation)?'0 201':val.data/totalData*201+' 201'}
                  strokeDashoffset={(animation)?0:-1*(201-(angle+val.data/totalData*201))}
                  style={{zIndex:100000, transition:(animation)?'all 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',pointerEvents:'auto'}}
                  onClick={mouseDown}
                  onMouseMove={onHover}
                  data-label={val.label}
                  data-numeric={val.data}
                  data-persen={val.data/totalData*100}
                  data-color={(color)?color:col}
                  data-backgroundColor={(mainColor)?mainColor[i]:`rgba(${mainCol[0]},${mainCol[1]},${mainCol[2]},.7)`}
                  data-border={(mainColor)?`.3rem solid ${mainColor[i]}`:`.3rem solid rgb(${mainCol[0]},${mainCol[1]},${mainCol[2]})`}
                  onMouseLeave={mouseLeave}></circle>
              </>)
          })
        }
      </svg>
      <div id={`label-${idContainer}`} style={{
        padding: '.5rem',zIndex: 1000000, display:'none', textAlign: 'center', position: 'absolute', pointerEvents: 'none',
        transition: (animation)?'color,background-color .5s ease':'none', ...propsLabelSlice
      }}></div>
      {
        (labelAlign === 'bottom')?labelMain():null
      }
    </div>
  )
}

Pie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationDelay: 1000,
  labelAlign: 'top'
}
