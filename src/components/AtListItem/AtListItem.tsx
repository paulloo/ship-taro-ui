import Taro from '@tarojs/taro';
import classNames from 'classnames'
import PropTypes, {InferProps } from 'prop-types'
import { AtListItemProps } from 'types/list'
import _isFunction from 'lodash/isFunction'
import { View, Image, Text, Switch } from '@tarojs/components';
import { ITouchEvent, CommonEvent } from '@tarojs/components/types/common'
import { mergeStyle } from '../../common/utils';
import AtComponent from '../../common/component';

export default class AtListItem extends AtComponent<AtListItemProps> {
      
    public static defaultProps: AtListItemProps
    public static propTypes: InferProps<AtListItemProps>
    constructor(props: AtListItemProps) {
        super(props);
        this.state = {
        };
    }

    private handleClick = (event: ITouchEvent): void => {
        if (_isFunction(this.props.onClick) && !this.props.disabled) {
          this.props.onClick(event)
        }
      }
    
      private handleSwitchClick (e: CommonEvent): void {
        e.stopPropagation()
      }
    
      private handleSwitchChange = (event: CommonEvent): void => {
        if (_isFunction(this.props.onSwitchChange) && !this.props.disabled) {
          this.props.onSwitchChange(event)
        }
      }
    public render(): JSX.Element {
        const {
            note,
            arrow,
            thumb,
            iconInfo,
            disabled,
            isSwitch,
            hasBorder,
            extraThumb,
            switchColor,
            switchIsCheck
          } = this.props
      
          let {
            extraText,
            title
          } = this.props
      
          extraText = String(extraText)
          title = String(title)
      
          const rootClass = classNames(
            'at-list__item',
            {
              'at-list__item--thumb': thumb,
              'at-list__item--multiple': note,
              'at-list__item--disabled': disabled,
              'at-list__item--no-border': !hasBorder
            },
            this.props.className
          )
          const iconClass = classNames(
            iconInfo!.prefixClass || 'at-icon',
            {
              [`${iconInfo!.prefixClass || 'at-icon'}-${iconInfo!.value}`]: iconInfo!.value,
            },
            iconInfo!.className
          )
        return (
            <View className={rootClass} onClick={this.handleClick}>
                <View className='at-list__item-container'>
                {thumb && (
                    <View className='at-list__item-thumb item-thumb'>
                    <Image
                      className='item-thumb__info'
                      mode='scaleToFill'
                      src={thumb}
                    />
                    </View>
                )}
                {iconInfo!.value && (
                    <View className='at-list__item-icon item-icon'>
                    <Text
                      className={iconClass}
                      style={
                        mergeStyle({
                            color: iconInfo!.color || '',
                            fontSize: `${iconInfo!.size || 24}px`,
                        }, iconInfo!.customStyle!)
                        }
                    ></Text>
                    </View>
                )}
                <View className='at-list__item-content item-content'>
                    <View className='item-content__info'>
                    <View className='item-content__info-title'>{title}</View>
                    {note && <View className='item-content__info-note'>{note}</View>}
                    </View>
                </View>
                <View className='at-list__item-extra item-extra'>
                    {extraText && <View className='item-extra__info'>{extraText}</View>}

                    {extraThumb && !extraText && (
                    <View className='item-extra__image'>
                        <Image
                          className='item-extra__image-info'
                          mode='aspectFit'
                          src={extraThumb}
                        />
                    </View>
                    )}

                    {isSwitch && !extraThumb && !extraText && (
                    <View
                      className='item-extra__switch'
                      onClick={this.handleSwitchClick}
                    >
                        <Switch
                          color={switchColor}
                          disabled={disabled}
                          checked={switchIsCheck}
                          onChange={this.handleSwitchChange}
                        />
                    </View>
                    )}

                    {arrow ? (
                    <View className='item-extra__icon'>
                        <Text
                          className={`at-icon item-extra__icon-arrow at-icon-chevron-${arrow}`}
                        />
                    </View>
                    ) : null}
                </View>
                </View>
            </View>
        );
    }
}


AtListItem.defaultProps = {
  note: '',
  disabled: false,
  title: '',
  thumb: '',
  isSwitch: false,
  hasBorder: true,
  switchColor: '#6190E8',
  switchIsCheck: false,
  extraText: '',
  extraThumb: '',
  iconInfo: { value: '' },
  onSwitchChange: () => {},
  onClick: () => {}
}

AtListItem.propTypes = {
  note: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  onClick: PropTypes.func,
  isSwitch: PropTypes.bool,
  hasBorder: PropTypes.bool,
  switchColor: PropTypes.string,
  switchIsCheck: PropTypes.bool,
  extraText: PropTypes.string,
  extraThumb: PropTypes.string,
  onSwitchChange: PropTypes.func,
  arrow: PropTypes.oneOf(['up', 'down', 'right']),
  iconInfo: PropTypes.shape({
    size: PropTypes.number,
    value: PropTypes.string,
    color: PropTypes.string,
    prefixClass: PropTypes.string,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  })
}
