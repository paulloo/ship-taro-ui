import Taro from '@tarojs/taro';
import isNaN from 'lodash/isNaN'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { AtBadgeProps } from 'types/badge'
import { View } from '@tarojs/components';
import AtComponent from '../../common/component'

export default class AtBadge extends AtComponent<AtBadgeProps> {

    public static defaultProps: AtBadgeProps
    public static propTypes: InferProps<AtBadgeProps>
    constructor(props: AtBadgeProps) {
        super(props);
        this.state = {
        };
    }
    
    private formatValue (value: string | number | undefined, maxValue: number): string | number {
        if (value === '' || value === null || value === undefined) return ''
        const numValue = +value
        if (isNaN(numValue)) {
        return value
        }
        return numValue > maxValue ? `${maxValue}+` : numValue
    }


    public render(): JSX.Element {
        const {
            dot,
            value,
            maxValue,
            customStyle,
          } = this.props
          const rootClassName = ['at-badge']
          const val = this.formatValue(value, maxValue!)
      
        return (
            <View className={classNames(rootClassName, this.props.className)} style={customStyle}>
                {this.props.children}
                {dot ? <View className='at-badge__dot'></View> : val !== '' && <View className='at-badge__num'>{val}</View>}
            </View>
        );
    }
}

AtBadge.defaultProps = {
    dot: false,
    value: '',
    maxValue: 99,
    customStyle: {},
    className: ''
  }
  
  AtBadge.propTypes = {
    dot: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxValue: PropTypes.number,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  }
  