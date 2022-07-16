import React,{useEffect} from 'react';
import {GenerateColorDark,GenerateColorLight} from './../utils/colorChange'

export default function Pie(props) {
  const {ky,color,mainColor,alpha,animation,animationDelay,values,onClickSlice,format,
    onHoverSlice,theme,label,labelAlign,propsLabel,propsLabelSlice,propsMain,group} = props;
  const idContainer = `container-pie-chart-${Math.random()*100000}`
  const constructElem = (lbl3,data,persen) =>
    `<table>
      <tr>
        <td colspan='3' style='text-align:center; white-space: nowrap;'>${lbl3}</td>
      </tr>
      ${(group)?
        `<tr>
          <td style='text-align:left;'><b>Group </b></td>
          <td><b> : </b></td>
          <td style='text-align:center; white-space: nowrap'>${group}</td>
        </tr>`:''}
      <tr>
        <td style='text-align:left;'><b>Data </b></td>
        <td><b> : </b></td>
        <td style='text-align:center; white-space: nowrap'>${Number(data).toFixed(format)}</td>
      </tr>
      <tr>
        <td style='text-align:left;'><b>Percentage </b></td>
        <td><b> : </b></td>
        <td style='text-align:center; white-space: nowrap'>${Number(persen).toFixed(format)}%</td>
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
      lbl.style.backgroundColor = elem.getAttribute('data-backgroundcolor')
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
        lbl.style.backgroundColor = elem.getAttribute('data-backgroundcolor')
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
  const funPie = () => {
    var angle = 0.0;

    return values.map((val,i) => {
      var col;
      var mainCol;
      if (!mainCol) {
        if (theme === 'dark') {
          mainCol = GenerateColorDark();
          col = 'white';
        } else {
          mainCol = GenerateColorLight();
          col = 'black';
        }
      }
      const uy = () => {
        angle += val.data/totalData*201
      }
      return(
        <>
          <circle key={i} id={`pie-chart-${idContainer}-${i}`} fill="none" r="25%" cx="50%" cy="50%" strokeWidth='50%'
            stroke={(mainColor)?mainColor[i]:`rgba(${mainCol[0]},${mainCol[1]},${mainCol[2]},${(alpha)?alpha:1})`}
            strokeDasharray={val.data/totalData*201+' 201'}
            strokeDashoffset={`-${201-(angle+val.data/totalData*201)}`}
            style={{zIndex:100000, transition:(animation)?'all 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',pointerEvents:'auto'}}
            onClick={mouseDown}
            onMouseMove={onHover}
            data-label={val.label}
            data-numeric={val.data}
            data-persen={(val.data/totalData*100)}
            data-color={(color)?color:col}
            data-backgroundcolor={(mainColor)?mainColor[i]:`rgb(${mainCol[0]},${mainCol[1]},${mainCol[2]})`}
            data-border={(mainColor)?`.3rem solid ${mainColor[i]}`:`.3rem solid rgba(${255},${255},${255},.7)`}
            onMouseLeave={mouseLeave}></circle>
            {uy()}
        </>)
    })
  }

  var iu = 0
  var time1;
  var time3;
  const deck = () => {
    if (group) {
      time3 = null
      time3 = setTimeout(function () {
        const elem2 = document.getElementById(`pie-chart-${idContainer}-x`);
        if (elem2) {
          elem2.style.r = '50%';
        }
      }, (animationDelay-500 < 0)?0:animationDelay-500);
    }
  }

  const deck2 = () => {
    if (iu <= 0) {
      if (label) {
        if (animation) {
          time1 = null
          time1 = setTimeout(function () {
            const main = document.getElementById(`main-label-${idContainer}`)
            if (main) {
              main.style.opacity = 1
              main.style.top = `${0}px`
            }
          }, animationDelay);
        }
      }
    }
    iu = 1;
  }

  const labelMain = () => (
    (label)? (
        <>
          <div id={`main-label-${idContainer}`} style={(propsLabel)?propsLabel:{
            width: '100%', position: 'relative', textAlign: 'center',color: (color)?color:(theme === 'dark')?'black':'white',marginTop: (labelAlign === 'top')?0:'3rem',
            marginBottom: (labelAlign === 'bottom')?0:'3rem',fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Georgia',
            transition: (animation)? 'opacity 1s cubic-bezier(0.07,0.97,1.0,1.0), top 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
            opacity: (animation)?0:1,top: (animation)?'-5rem':0
          }}>{label}<br/><span style={{fontSize: '1.5rem'}}>Total Data : {Number(totalData).toFixed(format)}</span></div>
          {deck2()}
        </>
    ):null
  )

  return(
      <div  id={`container-main-${idContainer}`} key={ky} style={{position:'relative',pointerEvents:'none'}}>
        {
          (labelAlign === 'top')?labelMain():null
        }
        <svg id={idContainer} viewBox='0 0 128 128' style={{
          position:'absolute',display:'flex', width: '100%', ...propsMain, borderRadius: '50%',
          backgroundColor: 'transparent', pointerEvents:'none'
        }}>
          <circle fill="transparent" r="50%" cx="50%" cy="50%"
            style={{pointerEvents:'none'}}/>
          {
            (group)?(
              <>
                <circle id={`pie-chart-${idContainer}-x`} fill="white" r={(animation)? "0%":"50%"} cx="50%" cy="50%"
                  style={{pointerEvents:'none',transition: (animation)? 'r 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none'}}/>
                {deck()}
              </>
            ):null
          }
          {funPie()}
        </svg>
        <div id={`label-${idContainer}`} style={{
          padding: '.5rem',zIndex: 1000000, display:'none', textAlign: 'center', position: 'absolute', pointerEvents: 'none',
          transition: (animation)?'color .5s ease, background-color .5s ease':'none', ...propsLabelSlice
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
  labelAlign: 'top',
  format: 2
}
