// import { View, Block } from '@tarojs/components'
// import Taro from '@tarojs/taro'
// import classnames from 'classnames'
// import { SkeletonProps } from 'types/skeleton'

// const DEFAULT_ROW_WIDTH = '100%';
// export default function Skeleton (props: SkeletonProps) {

//   if (!props.loading) {
//     return <Block>{props.children}</Block>
//   }

//   const getRowWidth = (index: number) => {

//     if (props.rowProps) {
//       if (Array.isArray(props.rowProps)) {
//         return props.rowProps[index].width
//       }
//       return props.rowProps.width
//     }

//     if (props.rowWidth === DEFAULT_ROW_WIDTH) {
//       return DEFAULT_ROW_WIDTH
//     }
//     if (Array.isArray(props.rowWidth)) {
//       return props.rowWidth[index]
//     }
//     return props.rowWidth
//   }

//   const getRowHeight = (index: number) => {
//     if (props.rowProps) {
//       if (Array.isArray(props.rowProps)) {
//         return props.rowProps[index].height
//       }
//       return props.rowProps.height
//     }

//     if (Array.isArray(props.rowHeight)) {
//       return props.rowHeight[index]
//     }
//     return props.rowHeight
//   }


//   const addUnit = (value?: string | number)  => {
//     return typeof value === 'number' ? Taro.pxTransform(value) : value
//   }
 
//   const renderRows = (): JSX.Element | null => {
//     if (props.row) {
//       const rowArray = Array.apply(null, Array(props.row)).map((item, index) => index)
//       const Rows = rowArray.map((item, index) => {
//         return <View key={item} className='skeleton-row' style={`width: ${addUnit(getRowWidth(index))};height: ${addUnit(getRowHeight(index))}`} />
//       })
//       return <View className='skeleton-rows'>{Rows}</View>
//     }
//     return null
//   }

//   const renderMatrix = (): JSX.Element | null => {
//     if(props.matrix) {
//       let Boxes: any = []
//       // [
//       //   [2,2,2,1],
//       //   [2,2,2]
//       // ]
//       props.matrix.map((items: Array<Number>, index) => {
//         let Rows:any = []
//         items.map((item: Number, cIndex) => {
//           let Cols: any = []
//           let arr: any = []
//           arr.length = item
//           // arr.forEach((iitem, i) => {
//           // })
//           for(let i = 0; i < item; i++) {
//             Cols.push((<View key={i} className='skeleton-matrix-row' />))
//           }
//           Rows.push(<View key={cIndex} className='skeleton-matrix-col'>{Cols}</View>)
//         })
//         Boxes.push(<View className='skeleton-matrix-rows' key={index}>{Rows}</View>)
//       })
//       return Boxes
//     }
//     return null
//   }

//   const rootClass = classnames('skeleton', 'skeleton-custom-class', {
//     [`skeleton-type-${props.type}`]: true,
//     'skeleton-matrix': props.matrix,
//     'skeleton-animate-blink': props.animate && props.animateName === 'blink',
//     'skeleton-animate-elastic': props.animate && props.animateName === 'elastic'
//   })
//   return (
//     <View className={classnames(rootClass, this.props.className)} style={this.props.customStyle}>
//       <View className='skeleton-content' style={{textAlign: props.contentAlignStyle}}>
//         {renderRows()}
//         {renderMatrix()}
//       </View>
//     </View>
//   )
// }
// Skeleton.options = {
//   addGlobalClass: true
// }
// Skeleton.defaultProps = {
//   type: 'row',
//   row: 0,
//   col: 0,
//   loading: true,
//   animate: true,
//   rowWidth: '100%',
//   rowHeight: 24,
//   animateName: 'blink',
//   contentAlignStyle: 'left'
// }

// Skeleton.externalClasses = ['skeleton-custom-class']



import Taro from '@tarojs/taro';
import classnames from 'classnames'
import PropTypes, {InferProps } from 'prop-types'
import { View, Block } from '@tarojs/components';
import AtComponent from '../../common/component';
import { initTestEnv } from '../../common/utils';
import { SkeletonProps } from 'types/skeleton'

const DEFAULT_ROW_WIDTH = '100%';

initTestEnv()

export default class Skeleton extends AtComponent<SkeletonProps> {
    public static defaultProps: SkeletonProps
    public static propTypes: InferProps<SkeletonProps>
    constructor(props: SkeletonProps) {
        super(props);
        this.state = {
        };
        
    }


    
  getRowWidth(index: number) {
    const { rowProps, rowWidth } = this.props
    if (rowProps) {
      if (Array.isArray(rowProps)) {
        return rowProps[index].width
      }
      return rowProps.width
    }

    if (rowWidth === DEFAULT_ROW_WIDTH) {
      return DEFAULT_ROW_WIDTH
    }
    if (Array.isArray(rowWidth)) {
      return rowWidth[index]
    }
    return rowWidth
  }

  getRowHeight(index: number) {
    const { rowProps, rowHeight } = this.props
    if (rowProps) {
      if (Array.isArray(rowProps)) {
        return rowProps[index].height
      }
      return rowProps.height
    }

    if (Array.isArray(rowHeight)) {
      return rowHeight[index]
    }
    return rowHeight
  }


  addUnit(value?: string | number) {
    return typeof value === 'number' ? Taro.pxTransform(value) : value
  }
 
  renderRows(): JSX.Element | null {
    const { row } = this.props
    if (row) {
      const rowArray = Array.apply(null, Array(row)).map((item, index) => index)
      const Rows = rowArray.map((item, index) => {
        return <View key={item} className='skeleton-row' style={`width: ${this.addUnit(this.getRowWidth(index))};height: ${this.addUnit(this.getRowHeight(index))}`} />
      })
      return <View className='skeleton-rows'>{Rows}</View>
    }
    return null
  }

  renderMatrix(): JSX.Element | null {
    const { matrix } = this.props
    if(matrix) {
      let Boxes: any = []
      // [
      //   [2,2,2,1],
      //   [2,2,2]
      // ]
      matrix.map((items: Array<Number>, index) => {
        let Rows:any = []
        items.map((item: Number, cIndex) => {
          let Cols: any = []
          
          let i = 0
          while(item > i) {
            Cols.push(<View key={i} className='skeleton-matrix-row' />);
            i++
          }
          Rows.push(<View key={cIndex} className='skeleton-matrix-col'>{Cols}</View>)
        })
        Boxes.push(<View className='skeleton-matrix-rows' key={index}>{Rows}</View>)
      })
      return Boxes
    }
    return null
  }


    public render(): JSX.Element {
      const { loading, type, matrix, animate, animateName, className, customStyle, contentAlignStyle, children } = this.props
      
      if (!loading) {
        return <Block>{children}</Block>
      }


      const rootClass = classnames('skeleton', 'skeleton-custom-class', {
        [`skeleton-type-${type}`]: true,
        'skeleton-matrix': matrix,
        'skeleton-animate-blink': animate && animateName === 'blink',
        'skeleton-animate-elastic': animate && animateName === 'elastic'
      })
      return (
        <View className={classnames(rootClass, className)} style={customStyle}>
          <View className='skeleton-content' style={{textAlign: contentAlignStyle}}>
            {this.renderRows()}
            {this.renderMatrix()}
          </View>
        </View>
      );
    }
}


Skeleton.defaultProps = {
    type: 'row',
    row: 0,
    col: 0,
    loading: true,
    animate: true,
    rowWidth: '100%',
    rowHeight: 24,
    animateName: 'blink',
    contentAlignStyle: 'left'
}

Skeleton.options = {
  addGlobalClass: true
}

Skeleton.propTypes = {
  type: PropTypes.string,
  row: PropTypes.number,
  col: PropTypes.number,
  loading: PropTypes.bool,
  animate: PropTypes.bool,
  rowWidth: PropTypes.string,
  rowHeight: PropTypes.number,
  animateName: PropTypes.string,
  contentAlignStyle: PropTypes.string,
}
