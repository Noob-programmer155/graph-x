import React,{useEffect} from 'react'
import Pie from './Pie'

export default function StackedPie(props) {
  const{color,mainColor,alpha,animation,animationDelay,values,onClickSlice,labelAlign,format,
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
          main.style.opacity = 1
          main.style.top = `${0}px`
        }, animationDelay);
      }
    }
  },[])

  const labelMain = () => (
    (label)? (
        <div id={`main-label-${idContainer}`} style={(propsLabel)?propsLabel:{
          width: '100%', position: 'relative', textAlign: 'center',color: (color)?color:(theme === 'dark')?'black':'white',marginTop: (labelAlign === 'top')?0:'3rem',
          marginBottom: (labelAlign === 'bottom')?0:'3rem',fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Georgia', transition: (animation)? 'opacity,top 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
          opacity: (animation)?0:1,top: (animation)?'-5rem':0
        }}>
          <table align={'center'}>
            <tr>
              <td colspan={3} style={{fontSize: '2rem'}}>{label}</td>
            </tr>
            {
              dataGroup.map((val,i) => (
                <tr key={i}>
                  <td style={{textAlign:'left',fontSize: '1.5rem'}}>{val.label}</td>
                  <td style={{fontSize: '1.5rem'}}> : </td>
                  <td style={{fontSize: '1.5rem'}}>{Number(val.data).toFixed(format)}</td>
                </tr>
              ))
            }
            <tr>
              <td style={{textAlign:'left',fontSize: '1.5rem'}}>Total Dataset</td>
              <td style={{fontSize: '1.5rem'}}> : </td>
              <td style={{fontSize: '1.5rem'}}>{totalDataset}</td>
            </tr>
            <tr>
              <td style={{textAlign:'left',fontSize: '1.5rem'}}>Total Data</td>
              <td style={{fontSize: '1.5rem'}}> : </td>
              <td style={{fontSize: '1.5rem'}}>{Number(totalData).toFixed(format)}</td>
            </tr>
          </table>
        </div>
    ):null
  )

  const comp = () => {
    var arrComp = [];
    for (var i = 1; i < values.length; i++) {
      arrComp.unshift(50/i);
    }
    arrComp.unshift(0);

    var rotate;
    if (rotates === 'default') {
      rotate = 0;
    } else if (rotates === 'dynamic') {
      rotate = Math.random()*360;
    } else {
      rotate = rotates
    }
    return values.map((val,i) => {
      return <Pie ky={i} color={color} mainColor={mainColor} alpha={alpha} animation={animation}
        animationDelay={animationDelay} values={val.data} onClickSlice={onClickSlice} format={format}
        onHoverSlice={onHoverSlice} theme={theme} propsLabelSlice={propsLabelSlice} group={val.label}
        propsMain={{...propsPie,width:`${(values.length-i)/values.length*100}%`,
          height:`inherit`, left:0,top:0,
          transform: `translate(${arrComp[i]*i}%,${arrComp[i]*i}%) rotate(${rotate}deg)`}}/>;
    })
  }

  return(
    <div {...attr}>
      {
        (labelAlign === 'top')?labelMain():null
      }
      <div id={`container-full-main-${idContainer}`} style={{...propsContainer,width:'100%',height:'inherit',display:'block',
        align:'center',textAlign:'center',position:'relative'}}>
        {
          comp()
        }
      </div>
      {
        (labelAlign === 'bottom')?labelMain():null
      }
    </div>
  )
}

StackedPie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationDelay: 1000,
  labelAlign: 'top',
  format: 2,
  rotates: 'default'
}
