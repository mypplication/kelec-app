//
//  KeleciOSWidgetLiveActivity.swift
//  KeleciOSWidget
//
//  Created by Kelyan Pegeot-Selme on 18/03/2024.
//

//import ActivityKit
//import WidgetKit
//import SwiftUI
//
//struct KeleciOSWidgetAttributes: ActivityAttributes {
//    public struct ContentState: Codable, Hashable {
//        // Dynamic stateful properties about your activity go here!
//        var emoji: String
//    }
//
//    // Fixed non-changing properties about your activity go here!
//    var name: String
//}
//
//struct KeleciOSWidgetLiveActivity: Widget {
//    var body: some WidgetConfiguration {
//        ActivityConfiguration(for: KeleciOSWidgetAttributes.self) { context in
//            // Lock screen/banner UI goes here
//            VStack {
//                Text("Hello \(context.state.emoji)")
//            }
//            .activityBackgroundTint(Color.cyan)
//            .activitySystemActionForegroundColor(Color.black)
//
//        } dynamicIsland: { context in
//            DynamicIsland {
//                // Expanded UI goes here.  Compose the expanded UI through
//                // various regions, like leading/trailing/center/bottom
//                DynamicIslandExpandedRegion(.leading) {
//                    Text("Leading")
//                }
//                DynamicIslandExpandedRegion(.trailing) {
//                    Text("Trailing")
//                }
//                DynamicIslandExpandedRegion(.bottom) {
//                    Text("Bottom \(context.state.emoji)")
//                    // more content
//                }
//            } compactLeading: {
//                Text("L")
//            } compactTrailing: {
//                Text("T \(context.state.emoji)")
//            } minimal: {
//                Text(context.state.emoji)
//            }
//            .widgetURL(URL(string: "http://www.apple.com"))
//            .keylineTint(Color.red)
//        }
//    }
//}
//
//extension KeleciOSWidgetAttributes {
//    fileprivate static var preview: KeleciOSWidgetAttributes {
//        KeleciOSWidgetAttributes(name: "World")
//    }
//}
//
//extension KeleciOSWidgetAttributes.ContentState {
//    fileprivate static var smiley: KeleciOSWidgetAttributes.ContentState {
//        KeleciOSWidgetAttributes.ContentState(emoji: "😀")
//     }
//     
//     fileprivate static var starEyes: KeleciOSWidgetAttributes.ContentState {
//         KeleciOSWidgetAttributes.ContentState(emoji: "🤩")
//     }
//}
//
//#Preview("Notification", as: .content, using: KeleciOSWidgetAttributes.preview) {
//   KeleciOSWidgetLiveActivity()
//} contentStates: {
//    KeleciOSWidgetAttributes.ContentState.smiley
//    KeleciOSWidgetAttributes.ContentState.starEyes
//}
