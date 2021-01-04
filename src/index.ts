import Taro from '@tarojs/taro'
import './style/index.scss'
import './style/themes/red.scss'
import './style/themes/purple.scss'

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })

export { default as AtActionSheet } from './components/AtActionSheet/AtActionSheet'
export { default as AtActionSheetItem } from './components/AtActionSheetItem/AtActionSheetItem'
export { default as AtActionSheetHeader } from './components/AtActionSheetHeader/AtActionSheetHeader'
export { default as AtActionSheetBody } from './components/AtActionSheetBody/AtActionSheetBody'
export { default as AtActionSheetFooter } from './components/AtActionSheetFooter/AtActionSheetFooter'
export { default as AtActivityIndicator } from './components/AtActivityIndicator/AtActivityIndicator'
export { default as AtBadge } from './components/AtBadge/AtBadge'
export { default as AtButton } from './components/AtButton/AtButton'
export { default as AtCurtain } from './components/AtCurtain/AtCurtain'
export { default as AtFloatLayout } from './components/AtFloatLayout/AtFloatLayout'
export { default as AtForm } from './components/AtForm/AtForm'
export { default as AtIcon } from './components/AtIcon/AtIcon'
export { default as AtIndexes } from './components/AtIndexes/AtIndexes'
export { default as AtInput } from './components/AtInput/AtInput'
export { default as AtInputNumber } from './components/AtInputNumber/AtInputNumber'
export { default as AtList } from './components/AtList/AtList'
export { default as AtListItem } from './components/AtListItem/AtListItem'
export { default as AtModal } from './components/AtModal/AtModal'
export { default as AtModalAction } from './components/AtModalAction/AtModalAction'
export { default as AtModalContent } from './components/AtModalContent/AtModalContent'
export { default as AtModalHeader } from './components/AtModalHeader/AtModalHeader'
// export { default as AtNavBar } from './components/AtNavBar/AtNavBar'
export { default as AtNoticebar } from './components/AtNoticebar/AtNoticebar'
// export { default as AtPagination } from './components/AtPagination/AtPagination'
export { default as AtProgress } from './components/AtProgress/AtProgress'
export { default as AtSearchBar } from './components/AtSearchBar/AtSearchBar'
export { default as AtSelput } from './components/AtSelput/AtSelput'
export { default as AtSwitch } from './components/AtSwitch/AtSwitch'
// export { default as AtTabBar } from './components/AtTabBar/AtTabBar'
export { default as AtTabs } from './components/AtTabs/AtTabs'
export { default as AtTabsPane } from './components/AtTabsPane/AtTabsPane'


// export { default as AtTag } from './components/AtTag/AtTag'
export { default as AtTextarea } from './components/AtTextarea/AtTextarea'
// export { default as AtTimeline } from './components/AtTimeline/AtTimeline'
export { default as AtToast } from './components/AtToast/AtToast'
// export { default as AtAccordion } from './components/AtAccordion/AtAccordion'
// export { default as AtSlider } from './components/AtSlider/AtSlider'
// export { default as AtSwipeAction } from './components/AtSwipeAction/AtSwipeAction'
// export { default as AtLoadMore } from './components/load-more'
// export { default as AtDivider } from './components/divider'
// export { default as AtCountdown } from './components/AtCountdown/AtCountdown'
// export { default as AtSteps } from './components/AtSteps/AtSteps'
// export { default as AtMessage } from './components/AtMessage/AtMessage'
export { default as AtImagePicker } from './components/AtImagePicker/AtImagePicker'
// export { default as AtRange } from './components/AtRange/AtRange'
// export { default as AtCalendar } from './components/calendar'
export { default as AtFab } from './components/AtFab/AtFab'


/* 私有的组件  */
export { default as AtLoading } from './components/AtLoading/AtLoading'
// export { default as AtComponent } from './common/component'
export { default as TaroDate } from './components/TaroDate'

export { default as Skeleton } from './components/Skeleton/Skeleton'

