import React,{useEffect} from 'react'
import Pie from './Pie'

export default function FullPie(props) {
  const{color,mainColor,alpha,animation,animationDelay,values,onClickSlice,labelAlign,
    onHoverSlice,theme,label,propsLabel,propsLabelSlice,propsPie,propsContainer} = props;

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
              dataGroup.map((val) => (
                <tr>
                  <td style={{textAlign:'left',fontSize: '1.5rem'}}>{val.label}</td>
                  <td style={{fontSize: '1.5rem'}}> : </td>
                  <td style={{fontSize: '1.5rem'}}>{val.data}</td>
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
              <td style={{fontSize: '1.5rem'}}>{totalData}</td>
            </tr>
          </table>
        </div>
    ):null
  )

  var pie = 0;
  return(
    <div style={{display:'block',pointerEvents:'none'}}>
      {
        (labelAlign === 'top')?labelMain():null
      }
      <div style={{...propsContainer,width:'100%',display:'block',position:'relative',textAlign:'center',pointerEvents:'none'}}>
        {
          values.map((val,i) => {
            if (i > 0) {
              pie += 25
            }
            return <Pie key={i} color={color} mainColor={mainColor} alpha={alpha} animation={animation}
              animationDelay={animationDelay} values={val.data} onClickSlice={onClickSlice}
              onHoverSlice={onHoverSlice} theme={theme} propsLabelSlice={propsLabelSlice} group={val.label}
              propsMain={{...propsPie,width:`${(values.length-i)/values.length*100}%`,
                height:`inherit`, position: 'absolute',top:0,left:0,
                transform: `translate(${i*pie}%,${i*pie}%)`}}/>;
          })
        }
      </div>
      {
        (labelAlign === 'bottom')?labelMain():null
      }
    </div>
  )
}

FullPie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationDelay: 1000,
  labelAlign: 'top'
}
