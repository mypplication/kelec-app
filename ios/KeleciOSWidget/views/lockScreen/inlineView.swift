//
//  inlineView.swift
//  KeleciOSWidgetExtension
//
//  Created by Kelyan Pegeot-Selme on 26/06/2024.
//

import Foundation
import WidgetKit
import SwiftUI
import renaultApi

struct KelecLockScreenInlineEntryView: View{
  var apiHandler: ApiHandler
  var body: some View{
    if #available(iOS 17, watchOS 10, *) {
      ZStack{
        KelecLockScreenInlineView(apiHandler: apiHandler)
          .containerBackground(for: .widget) {
            Color("blanc")
          }
      }
    }else{
      ZStack{
        KelecLockScreenInlineView(apiHandler: apiHandler)
      }
    }
  }
}

struct KelecLockScreenInlineView:View{
  var apiHandler: ApiHandler
  var body: some View{
    HStack{
      Image(systemName: apiHandler.getIsCarPlugged() ? (apiHandler.getIsCarCharging() ? "bolt.car.fill" : "bolt") : "car.fill")
      Text("\(apiHandler.getBatteryLevel())%")
    }
  }
}
