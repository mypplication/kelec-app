//
//  EntryView.swift
//  KeleciOSWidgetExtension
//
//  Created by Kelyan PEGEOT SELME on 16/07/2025.
//

import Foundation
import WidgetKit
import renaultApi
import SwiftUI

struct iosAlt1EntryViewMedium: View {
  var date:Date
  var carAccount: UserAccount
  var apiHandler: ApiHandler
  var userCar: UserCar
  var image: String
  var value: String
  var alternative: Int = 0
  var appPreferences: AppPreferences?
  var body: some View{
    if #available(iOS 17, *){
      ZStack{
        iosAlt1WidgetMediumView(date: date, carAccount: carAccount, apiHandler: apiHandler, userCar: userCar, image: image, value: value, appPreferences: appPreferences)
          .containerBackground(for: .widget) {
            Color("blanc")
          }
      }
    }else{
      ZStack{
        iosAlt1WidgetMediumView(date: date, carAccount: carAccount, apiHandler: apiHandler, userCar: userCar, image: image, value: value, appPreferences: appPreferences)
      }
    }
  }
}
