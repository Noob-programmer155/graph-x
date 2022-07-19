import React,{useEffect,useMemo} from 'react'
import Pie from './Pie'
import {animateValue} from './../utils/numberCounter'

export default function StackedPie(props) {
  const{alpha,animation,animationInterval,values,onClickSlice,labelAlign,formatDecimal,rotateStep,
    onHoverSlice,theme,label,propsLabel,propsLabelSlice,propsPie,propsContainer,rotates,...attr} = props;

  const idContainer = `container-full-pie-chart-${Math.random()*100000}`

  var totalDataset = values.length;
  var totalData = 0;
  var dataGroup = []
  values.map((item,i)=>{
    var total = 0;
    item.data.map((val) => total += val.data)
    dataGroup.push({label:item.label,data:total})
    totalData += total;
  })

  useEffect(() => {
    if (label) {
      if (animation) {
        setTimeout(function () {
          const main = document.getElementById(`main-label-${idContainer}`)
          const elem3 = document.getElementById(`slice-container-${idContainer}`)
          main.style.opacity = 1
          main.style.top = `${(labelAlign==='bottom')?elem3.getBoundingClientRect().height:0}px`
        }, 500);
      }
    }
  },[])

  const LabelMain = () => {
    const lwe = () => {
      setTimeout(function () {
        const main = document.getElementById(`main-label-full-counter-${idContainer}`)
        if (main) {
          animateValue(main,0,1,Number(totalData).toFixed(formatDecimal),animationInterval,formatDecimal)
        }
      }, 1000)
    }

    return useMemo(() => (
      (label)? (
        <div id={`main-label-${idContainer}`} style={{
          width: '100%', position: 'relative', textAlign: 'center',color: (theme === 'dark')?'#5B5B5B':'white',paddingTop: (labelAlign === 'top')?0:'3rem',
          paddingBottom: (labelAlign === 'bottom')?0:'3rem',fontSize: '25px', fontWeight: 'bold', fontFamily: 'Georgia',
          transition: (animation)? 'opacity,top '+animationInterval/1000+'s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
          opacity: (animation)?0:1,top: (animation)?'-5rem':0, ...propsLabel
        }}><span>{label}</span><br/>
          <table style={{fontSize: '15px'}}>
            <tbody style={{fontSize: 'inherit',display:'flex',display:'-ms-flex',display:'-webkit-flex',flexWrap:'wrap',justifyContent:'center'}}>
              {
                dataGroup.map((val,i) => (
                  <tr key={i} style={{margin:'0 10px 5px 10px'}}>
                    <td style={{textAlign:'left',fontSize: 'inherit'}}>{val.label}</td>
                    <td style={{fontSize: 'inherit'}}> : </td>
                    <td style={{fontSize: 'inherit'}}>{Number(val.data).toFixed(formatDecimal)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table><br/><span style={{fontSize: '15px', margin:'0px'}}>Total Dataset : {totalDataset}</span>
            <br/><span style={{fontSize: '15px', margin:'0px'}}>Total Data : <span id={`main-label-full-counter-${idContainer}`}>{(animation)?lwe():Number(totalData).toFixed(formatDecimal)}</span></span>
        </div>
      ):null
    ),[values,label,propsLabel])
  }

  var rotate = 0;
  const comp = () => {
    var arrComp = [];
    for (var i = 1; i < values.length; i++) {
      arrComp.unshift(50/i);
    }
    arrComp.unshift(0);
    return values.map((val,i) => {
      if (rotates === 'default') {
        rotate = 0;
      } else if (rotates === 'dynamic') {
        rotate += rotateStep;
      } else {
        rotate = rotates
      }
      return <Pie key={i} alpha={alpha} animation={animation} animationInterval={animationInterval}
        values = {val.data} onClickSlice={onClickSlice} formatDecimal={formatDecimal} rootCircleColor={val.rootCircleColor}
        onHoverSlice={onHoverSlice} theme={theme} group={val.label} propsInfoContainer={propsLabelSlice}
        propsPieContainer={{...propsPie,width:`${(values.length-i)/values.length*100}%`,
          left:0,top:0,transform: `translate(${arrComp[i]*i}%,${arrComp[i]*i}%) ${(animation)?'rotate('+rotate+'deg)':''}`}}/>;
    })
  }

  return(
    <div {...attr}>
      {
        (labelAlign === 'top')?LabelMain():null
      }
      <div id={`container-full-main-${idContainer}`} style={{...propsContainer,width:'100%',height:'inherit',display:'block',
        align:'center',textAlign:'center',position:'relative'}}>
        <svg id={`slice-container-${idContainer}`} viewBox='0 0 128 128' style={{
          display:'flex', width: '100%',backgroundColor: 'transparent',
          borderRadius: '50%', pointerEvents:'none', position:'absolute'
        }}>
          <circle fill="none" r="25%" cx="50%" cy="50%"/>
        </svg>
        {
          comp()
        }
      </div>
      {
        (labelAlign === 'bottom')?LabelMain():null
      }
    </div>
  )
}

StackedPie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationInterval: 1000,
  labelAlign: 'top',
  formatDecimal: 2,
  rotateStep: 90,
  rotates: 'default',
}
