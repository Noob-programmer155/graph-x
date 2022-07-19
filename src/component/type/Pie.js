import React,{useMemo} from 'react';
import {GenerateColorDark,GenerateColorLight} from './../utils/colorChange'
import {animateValue} from './../utils/numberCounter'

export default function Pie(props) {
  const {id,alpha,animation,animationInterval,values,onClickSlice,formatDecimal,rootCircleColor,
    onHoverSlice,theme,label,labelAlign,group,propsLabel,propsInfoContainer,propsPieContainer,...attr} = props;
  const idContainer = (id)?id:`container-pie-chart-${Math.random()*100000}`
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
        <td style='text-align:center; white-space: nowrap'>${Number(data).toFixed(formatDecimal)}</td>
      </tr>
      <tr>
        <td style='text-align:left;'><b>Percentage </b></td>
        <td><b> : </b></td>
        <td style='text-align:center; white-space: nowrap'>${Number(persen).toFixed(formatDecimal)}%</td>
      </tr>
    </table>`

  const mouseDown = (e) => {
    const elem = e.currentTarget;
    if (onClickSlice) {
      onClickSlice({event:e,label:elem.getAttribute('data-label'),data:elem.getAttribute('data-numeric'),persen:elem.getAttribute('data-persen'),
        group:group,color:elem.getAttribute('data-color'),backgroundColor:elem.getAttribute('data-backgroundcolor')});
    } else {
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
    if (onHoverSlice) {
      onHoverSlice({event:e,label:elem.getAttribute('data-label'),data:elem.getAttribute('data-numeric'),persen:elem.getAttribute('data-persen'),
        group:group,color:elem.getAttribute('data-color'),backgroundColor:elem.getAttribute('data-backgroundcolor')})
    } else {
      if (!alpha) {
        elem.style.strokeOpacity = .7;
      } else {
        elem.style.strokeOpacity = 1;
      }
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
            stroke={(val.backgroundColor)?val.backgroundColor:mainCol}
            strokeOpacity={(alpha)?alpha:1}
            strokeDasharray={val.data/totalData*201+' 201'}
            strokeDashoffset={`-${201-(angle+val.data/totalData*201)}`}
            style={{zIndex:100000, transition:(animation)?'all '+(animationInterval/1000)+'s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
              pointerEvents:'auto', border:'5px solid #ffff'}}
            onClick={mouseDown}
            onMouseMove={onHover}
            data-label={val.label}
            data-numeric={val.data}
            data-persen={(val.data/totalData*100)}
            data-color={(val.color)?val.color:col}
            data-backgroundcolor={(val.backgroundColor)?val.backgroundColor:mainCol}
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
      clearTimeout(time3)
      time3 = setTimeout(function () {
        const elem2 = document.getElementById(`pie-chart-${idContainer}-x`);
        if (elem2) {
          elem2.style.r = '50%';
        }
      }, 500);
    }
  }

  const deck2 = () => {
    if (iu <= 0) {
      if (label) {
        clearTimeout(time1);
        time1 = setTimeout(function () {
          const main = document.getElementById(`main-label-${idContainer}`)
          if (main) {
            main.style.opacity = 1
            main.style.top = `${0}px`
          }
          const counter = document.getElementById(`main-label-counter-${idContainer}`);
          if (counter) {
            animateValue(counter,0,1,Number(totalData).toFixed(formatDecimal),animationInterval,formatDecimal)
          }
          const elem3 = document.getElementById(idContainer);
          if (elem3) {
            if (labelAlign === 'bottom') {
              main.style.top = `${elem3.getBoundingClientRect().height}px`
            }
          }
        }, 1000);
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
              width: '100%', position: 'relative', textAlign: 'center',color: (theme === 'dark')?'#5B5B5B':'white',paddingTop: (labelAlign === 'top')?0:'2rem',
              paddingBottom: (labelAlign === 'bottom')?0:'2rem',fontSize: '25px', fontWeight: 'bold', fontFamily: 'Georgia',
              transition: (animation)? 'all '+(animationInterval/1000)+'s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
              opacity: (animation)?0:1,top: (animation)?'-100px':0, ...propsLabel
            }}><span>{label}</span><br/><span style={style}>Total Data : <span id={`main-label-counter-${idContainer}`}>
              {(animation)?deck2():Number(totalData).toFixed(formatDecimal)}
            </span></span></div>
          </>
      ):null
    )

  return useMemo(() => (
      <div id={`container-main-${idContainer}`} style={{...attr,position:'relative',pointerEvents:'none'}}>
        {
          (labelAlign === 'top')?labelMain():null
        }
        <svg id={idContainer} viewBox='0 0 128 128' style={{
          display:'flex', width: '100%',backgroundColor: 'transparent', ...propsPieContainer,
          borderRadius: '50%', pointerEvents:'none', position:'absolute'
        }}>
          <circle fill="transparent" r="50%" cx="50%" cy="50%"
            style={{pointerEvents:'none'}}/>
          {
            (group)?(
              <>
                <circle id={`pie-chart-${idContainer}-x`} fill={rootCircleColor} r={(animation)? "0%":"50%"} cx="50%" cy="50%"
                  style={{pointerEvents:'none',
                  transition: (animation)? 'all '+(animationInterval/1000)+'s cubic-bezier(0.07,0.97,1.0,1.0)':'none'}}/>
                {deck()}
              </>
            ):null
          }
          {funPie()}
        </svg>
        <div id={`label-${idContainer}`} style={{
          padding: '.5rem',zIndex: 1000000, textAlign: 'center',transition: (animation)?'color .5s ease, background-color .5s ease':'none',
          ...propsInfoContainer, position: 'fixed', display:'none', pointerEvents: 'none'
        }}></div>
        {
          (labelAlign === 'bottom')?labelMain():null
        }
      </div>
  ),[alpha,animation,animationInterval,values,formatDecimal,rootCircleColor,theme,
    label,labelAlign,propsLabel,propsInfoContainer,propsPieContainer])
}

Pie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationInterval: 1000,
  labelAlign: 'top',
  formatDecimal: 2,
  rootCircleColor: '#ffff',
}
