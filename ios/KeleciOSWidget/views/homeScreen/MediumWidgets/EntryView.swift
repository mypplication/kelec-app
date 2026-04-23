//
//  MediumWidgets.swift
//  KeleciOSWidgetExtension
//
//  Created by Kelyan Pegeot-Selme on 18/03/2024.
//

import Foundation
import WidgetKit
import renaultApi
import SwiftUI


struct iosWidgetEntryViewMedium: View{
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
        iosWidgetMediumView(date: date, carAccount: carAccount, apiHandler: apiHandler, userCar: userCar, image: image, value: value, appPreferences: appPreferences)
          .containerBackground(for: .widget) {
            Color("blanc")
          }
      }
    }else{
      ZStack{
        iosWidgetMediumView(date: date, carAccount: carAccount, apiHandler: apiHandler, userCar: userCar, image: image, value: value, appPreferences: appPreferences)
      }
    }
  }
}
