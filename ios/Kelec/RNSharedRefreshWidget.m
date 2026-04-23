//
//  RNSharedRefreshWidget.m
//  Kelec
//
//  Created by Kelyan Pegeot-Selme on 18/03/2024.
//

#import <Foundation/Foundation.h>
#import "RNSharedRefreshWidget.h"
#import "Kelec-Swift.h"

@implementation RNSharedRefreshWidget

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNSharedRefreshWidget)

RCT_EXPORT_METHOD(refreshWidgets: (RCTResponseSenderBlock)callback){
  if (@available(iOS 14, *)) {
    [WidgetKitHelper reloadAllTimelines];
  } else {
      // Fallback on earlier versions
  }
  callback(@[[NSNull null]]);
}

@end
