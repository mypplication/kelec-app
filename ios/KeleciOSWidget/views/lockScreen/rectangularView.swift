//
//  rectangularView.swift
//  KeleciOSWidgetExtension
//
//  Created by Kelyan Pegeot-Selme on 26/06/2024.
//

import Foundation
import renaultApi
import SwiftUI

struct KelecLockScreenRectangularEntryView: View{
  var apiHandler: ApiHandler
  var value: String
  var appPreferences: AppPreferences?
  var body: some View{
    if #available(iOS 17, watchOS 10, *) {
      ZStack{
        KelecLockScreenRectangularView(apiHandler: apiHandler, value: value, appPreferences: appPreferences)
          .containerBackground(for: .widget) {
            Color("blanc")
          }
      }
    }else{
      ZStack{
        KelecLockScreenRectangularView(apiHandler: apiHandler, value: value, appPreferences: appPreferences)
      }
    }
  }
}

struct KelecLockScreenRectangularView:View{
  var apiHandler: ApiHandler
  var value: String
  var appPreferences: AppPreferences?
  var body: some View{
      VStack(alignment: .leading, spacing: 6){
        HStack() {
          Image(systemName: apiHandler.getIsCarPlugged() ? (apiHandler.getIsCarCharging() ? "bolt.car.fill" : "bolt") : "car.fill")
            .widgetAccentable()
          Text("\(value)")
            .widgetAccentable()
          
        }
        
        HStack(spacing: 0) {
          Text("\(apiHandler.getBatteryLevel())% ")
            .fontWeight(.bold)
            .widgetAccentable()
          Text(" | \(apiHandler.getBatteryRange(appPreferences: appPreferences)) \(getUnitsText(useMiles: appPreferences?.displayMiles ?? false))")
            .widgetAccentable()
          
        }
        ZStack {
          
          Gauge(value: Double(apiHandler.getBatteryLevel()) , in: 0...100) {
            
          }
          .gaugeStyle(.accessoryLinearCapacity)
          .tint(.accentColor)
          .widgetAccentable()
        }
  }
}
}
