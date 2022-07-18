import React,{useMemo} from 'react';
import {GenerateColorDark,GenerateColorLight} from './../utils/colorChange'
import {animateValue} from './../utils/numberCounter'

export default function Pie(props) {
  const {alpha,animation,animationDelay,values,onClickSlice,format,rootCircleColor,
    onHoverSlice,theme,label,labelAlign,propsLabel,propsInfoContainer,propsPieContainer,group} = props;
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
      lbl.style.top = `${e.clientY}px`
      lbl.style.left = `${e.clientX}px`
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
      lbl.style.top = `${e.clientY}px`
      lbl.style.left = `${e.clientX}px`
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
      if (!val.color && !val.backgroundColor) {
        if (!mainCol) {
          if (theme === 'dark') {
            mainCol = GenerateColorDark();
            col = 'white';
          } else {
            mainCol = GenerateColorLight();
            col = '#242424';
          }
        }
      }
      const uy = () => {
        angle += val.data/totalData*201
      }
      return(
        <>
          <circle key={i} id={`pie-chart-${idContainer}-${i}`} fill="none" r="25%" cx="50%" cy="50%" strokeWidth='50%'
            stroke={(val.mainColor)?val.mainColor:mainCol}
            strokeOpacity={(alpha)?alpha:1}
            strokeDasharray={val.data/totalData*201+' 201'}
            strokeDashoffset={`-${201-(angle+val.data/totalData*201)}`}
            style={{zIndex:100000, transition:(animation)?'all 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',pointerEvents:'auto'}}
            onClick={mouseDown}
            onMouseMove={onHover}
            data-label={val.label}
            data-numeric={val.data}
            data-persen={(val.data/totalData*100)}
            data-color={(val.color)?val.color:col}
            data-backgroundcolor={(val.mainColor)?val.mainColor:mainCol}
            data-border={(theme === 'dark')?`.3rem solid rgba(${255},${255},${255},.7)`:`.3rem solid rgba(${91},${91},${91},.7)`}
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
            const counter = document.getElementById(`main-label-counter-${idContainer}`);
            if (counter) {
              animateValue(counter,0,1,Number(totalData).toFixed(format),animationDelay)
            }
          }, animationDelay);
        }
      }
    }
    iu = 1;
  }

  const style = {
    fontSize: '15px'
  }

  const labelMain = () => (
      (label)? (
          <>
            <div id={`main-label-${idContainer}`} style={{
              width: '100%', position: 'relative', textAlign: 'center',color: (theme === 'dark')?'#5B5B5B':'white',marginTop: (labelAlign === 'top')?0:'3rem',
              marginBottom: (labelAlign === 'bottom')?0:'3rem',fontSize: '25px', fontWeight: 'bold', fontFamily: 'Georgia',
              transition: (animation)? 'all 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
              opacity: (animation)?0:1,top: (animation)?'-5rem':0, ...propsLabel
            }}><span>{label}</span><br/><span style={style}>Total Data : <span id={`main-label-counter-${idContainer}`}></span></span></div>
            {deck2()}
          </>
      ):null
    )

  return useMemo(() => (
      <div id={`container-main-${idContainer}`} style={{position:'relative',pointerEvents:'none'}}>
        {
          (labelAlign === 'top')?labelMain():null
        }
        <svg id={idContainer} viewBox='0 0 128 128' style={{
          position:'absolute',display:'flex', width: '100%', ...propsPieContainer,
          borderRadius: '50%',backgroundColor: 'transparent', pointerEvents:'none'
        }}>
          <circle fill="transparent" r="50%" cx="50%" cy="50%"
            style={{pointerEvents:'none'}}/>
          {
            (group)?(
              <>
                <circle id={`pie-chart-${idContainer}-x`} fill={rootCircleColor} r={(animation)? "0%":"50%"} cx="50%" cy="50%"
                  style={{pointerEvents:'none',transition: (animation)? 'r 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none'}}/>
                {deck()}
              </>
            ):null
          }
          {funPie()}
        </svg>
        <div id={`label-${idContainer}`} style={{
          padding: '.5rem',zIndex: 1000000, display:'none', textAlign: 'center', position: 'fixed', pointerEvents: 'none',
          transition: (animation)?'color .5s ease, background-color .5s ease':'none', ...propsInfoContainer
        }}></div>
        {
          (labelAlign === 'bottom')?labelMain():null
        }
      </div>
  ),[values,propsPieContainer])
}

Pie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationDelay: 1000,
  labelAlign: 'top',
  format: 2,
  rootCircleColor: '#ffff',
}
