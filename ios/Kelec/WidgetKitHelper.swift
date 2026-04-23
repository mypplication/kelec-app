//
//  WidgetKitHelper.swift
//  Kelec
//
//  Created by Kelyan Pegeot-Selme on 18/03/2024.
//

import WidgetKit

@available(iOS 14, *)
@objcMembers final class WidgetKitHelper: NSObject {
  
  class func reloadAllTimelines() {
#if arch(arm64) || arch(i386) || arch(x86_64)
    WidgetCenter.shared.reloadAllTimelines()
#endif
  }
}
